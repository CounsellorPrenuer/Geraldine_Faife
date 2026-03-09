'use client'

import React, { useState, useEffect } from 'react'
import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'

// Declare Razorpay for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

export function ContactSection({ title, description, email, phone, address, formTitle, id, backgroundImage }: SectionProps) {
  const bgImageUrl = backgroundImage ? urlForImage(backgroundImage).width(1600).height(900).url() : null
  const hasContactInfo = email || phone || address

  // State for form and payment
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [selectedPackage, setSelectedPackage] = useState<{ name: string, price: number } | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [couponData, setCouponData] = useState<any>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // External Backend URL (User's Cloudflare Worker)
  const BACKEND_URL = 'https://mentoria-backend.mihika.workers.dev';

  useEffect(() => {
    // Listen for package selection from other components
    const handlePackageSelect = (e: any) => {
      setSelectedPackage(e.detail)
    }
    window.addEventListener('select-package', handlePackageSelect)

    // Load Razorpay Script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      window.removeEventListener('select-package', handlePackageSelect)
    }
  }, [])

  const calculateTotal = () => {
    if (!selectedPackage) return 0
    let price = selectedPackage.price
    if (couponData) {
      if (couponData.type === 'percentage') {
        price = price * (1 - couponData.value / 100)
      } else if (couponData.type === 'flat') {
        price = Math.max(0, price - couponData.value)
      }
    }
    return Math.round(price)
  }

  const handleApplyCoupon = async () => {
    if (!couponCode) return
    setIsApplyingCoupon(true)
    setCouponError('')
    try {
      const res = await fetch(`${BACKEND_URL}/validate-coupon?code=${couponCode}`)
      const data: any = await res.json()
      if (data.valid) {
        setCouponData(data.coupon)
      } else {
        setCouponError(data.message || 'Invalid coupon')
        setCouponData(null)
      }
    } catch (err) {
      setCouponError('Error validating coupon')
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email.')
      return
    }

    if (selectedPackage) {
      handlePayment()
    } else {
      setIsProcessing(true)
      try {
        const res = await fetch(`${BACKEND_URL}/submit-contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        const result: any = await res.json()
        if (result.success) {
          alert('Thank you for your message! It has been sent successfully.')
          setFormData({ name: '', email: '', message: '' })
        } else {
          throw new Error(result.error || 'Failed to send message')
        }
      } catch (error) {
        console.error(error)
        alert('Failed to send message. Please try again later.')
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    const amount = calculateTotal()

    try {
      // 1. Create order on backend
      const res = await fetch(`${BACKEND_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          receipt: `rcpt_${Date.now()}`,
          userData: { ...formData, package: selectedPackage?.name, coupon: couponCode }
        })
      })

      const order: any = await res.json()

      if (!order.id) throw new Error('Failed to create order')

      // 2. Open Razorpay Checkout
      const options = {
        key: 'rzp_live_ZDRBsLXKmZI6Gu', // Provided by user
        amount: order.amount,
        currency: order.currency,
        name: 'Mentoria Packages',
        description: selectedPackage?.name,
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment on backend
          const verifyRes = await fetch(`${BACKEND_URL}/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userData: formData,
              package: selectedPackage
            })
          })
          const result: any = await verifyRes.json()
          if (result.success) {
            alert('Payment Successful! A confirmation email has been sent.')
            setSelectedPackage(null)
            setCouponData(null)
            setFormData({ name: '', email: '', message: '' })
          } else {
            alert('Payment verification failed.')
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: '#3b82f6'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section
      id={id || 'contact'}
      className="contact-section"
      style={{
        padding: '80px 20px',
        backgroundColor: 'var(--color-surface)',
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {bgImageUrl && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 0,
          }}
        />
      )}
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {title && (
          <h2 style={{ fontSize: '3rem', marginBottom: '10px', textAlign: 'center', color: 'var(--color-primary)', fontWeight: '700' }}>
            {title}
          </h2>
        )}
        {description && (
          <p style={{ fontSize: '1.1rem', marginBottom: '60px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            {description}
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: hasContactInfo ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
            gap: '40px',
            maxWidth: hasContactInfo ? '1200px' : '600px',
            margin: '0 auto',
          }}
        >
          {hasContactInfo && (
            <div
              style={{
                backgroundColor: 'var(--color-background)',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h3 style={{ fontSize: '1.75rem', marginBottom: '30px', color: 'var(--color-text-primary)', fontWeight: '600' }}>Get in Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {email && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</strong>
                    <a href={`mailto:${email}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>{email}</a>
                  </div>
                )}
                {phone && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</strong>
                    <a href={`tel:${phone}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>{phone}</a>
                  </div>
                )}
                {address && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Address</strong>
                    <p style={{ color: 'var(--color-text-primary)', margin: 0, lineHeight: '1.6', fontSize: '1.1rem' }}>{address}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            style={{
              backgroundColor: 'var(--color-background)',
              padding: '40px',
              borderRadius: '16px',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            {formTitle && <h3 style={{ fontSize: '1.75rem', marginBottom: '30px', color: 'var(--color-text-primary)', fontWeight: '600' }}>{formTitle}</h3>}

            {/* Selected Package Display */}
            {selectedPackage && (
              <div style={{ padding: '15px', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', marginBottom: '20px', border: '1px dashed var(--color-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Selected Package:</span>
                    <h4 style={{ margin: 0, color: 'var(--color-primary)' }}>{selectedPackage.name}</h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Price:</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      ₹{selectedPackage.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Coupon Code Field */}
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    style={{ flexGrow: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponCode}
                    style={{ padding: '8px 16px', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    {isApplyingCoupon ? '...' : 'Apply'}
                  </button>
                </div>
                {couponError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{couponError}</p>}
                {couponData && (
                  <p style={{ color: 'green', fontSize: '0.8rem', marginTop: '5px' }}>
                    Coupon Applied! Discount: {couponData.type === 'percentage' ? `${couponData.value}%` : `₹${couponData.value}`}
                  </p>
                )}

                {selectedPackage && (
                  <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>Total Payable:</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ padding: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ padding: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
              />
              <textarea
                placeholder="Your Message (Optional)"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ padding: '16px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  opacity: isProcessing ? 0.7 : 1,
                  transition: 'background-color 0.2s'
                }}
              >
                {selectedPackage ? (isProcessing ? 'Processing...' : 'Pay Now & Submit') : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


