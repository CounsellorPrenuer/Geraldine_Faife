'use client'

import { useState, useEffect } from 'react'
import type { SectionProps } from '@/lib/sections/registry'





const customizePackages = [
    {
        title: 'Career Report',
        price: '₹1,500',
        description: 'Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider.',
        icon: '📊'
    },
    {
        title: 'Career Report + Career Counselling',
        price: '₹3,000',
        description: 'Connect with India\'s top career coaches to analyse your psychometric report and shortlist the top three career paths you\'re most likely to enjoy and excel at.',
        icon: '📝'
    },
    {
        title: 'Knowledge Gateway + Career Helpline Access',
        price: '₹100',
        description: 'Unlock holistic information on your career paths and get direct access to Mentoria\'s experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love.',
        icon: '💻'
    },
    {
        title: 'One-to-One Session with a Career Expert',
        price: '₹3,500',
        description: 'Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field.',
        icon: '💬'
    },
    {
        title: 'College Admission Planning',
        price: '₹3,000',
        description: 'Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner.',
        icon: '🎓'
    },
    {
        title: 'Exam Stress Management',
        price: '₹1,000',
        description: 'Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India\'s top educators. Increase your chances of acing exams with a calm and clear mind.',
        icon: '🧠'
    },
    {
        title: 'College Admissions Planner - 100 (CAP-100)',
        price: '₹199',
        description: '₹199 for a ranked list of the top 100 colleges in your course Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!',
        icon: '🎓'
    }
]

export function MentoriaPackagesSection({ title, subtitle, id, categories }: SectionProps) {
    // If we have categories from Sanity, use them. Otherwise fallback to empty arrays to prevent crashes.
    const hasCategories = Array.isArray(categories) && categories.length > 0;
    const [activeTabKey, setActiveTabKey] = useState('')

    // Use effect to set initial tab key on client side only to avoid hydration mismatch
    useEffect(() => {
        if (hasCategories && !activeTabKey) {
            setActiveTabKey(categories[0]._key || categories[0].categoryName)
        }
    }, [hasCategories, categories, activeTabKey])

    // Find the currently active category object
    const activeCategoryData = (hasCategories && activeTabKey)
        ? categories.find((c: any) => (c._key || c.categoryName) === activeTabKey)
        : hasCategories ? categories[0] : null;

    const activePackages = activeCategoryData?.packages || [];

    return (
        <section
            id={id || 'packages'}
            style={{
                padding: '80px 20px',
                backgroundColor: 'var(--color-background)',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Main Title */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '15px', fontWeight: '700', textAlign: 'center' }}>
                        {title || 'Mentoria Packages'}
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
                        {subtitle || 'Choose the right Mentoria plan for your career growth'}
                    </p>
                </div>

                {/* Tabs */}
                {hasCategories && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '15px',
                        flexWrap: 'wrap',
                        marginBottom: '50px',
                        position: 'relative',
                        zIndex: 10
                    }}>
                        {categories.map((category: any) => {
                            const categoryKey = category._key || category.categoryName;
                            const isActive = activeTabKey === categoryKey;

                            return (
                                <button
                                    key={categoryKey}
                                    type="button"
                                    onClick={() => {
                                        console.log('Tab clicked:', categoryKey);
                                        setActiveTabKey(categoryKey);
                                    }}
                                    style={{
                                        padding: '12px 24px',
                                        borderRadius: '30px',
                                        border: 'none',
                                        backgroundColor: isActive ? 'var(--color-primary)' : '#ffffff',
                                        color: isActive ? '#ffffff' : 'var(--color-primary)',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                        transition: 'all 0.2s ease',
                                        pointerEvents: 'auto',
                                        position: 'relative',
                                        zIndex: 11
                                    }}
                                >
                                    {category.categoryName}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Package Cards */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '100px' }}>
                    {activePackages.length > 0 ? (
                        activePackages.map((pkg: any, idx: number) => (
                            <div
                                key={pkg._key || idx}
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '16px',
                                    padding: '40px 30px',
                                    width: '100%',
                                    maxWidth: '450px',
                                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                                    border: '1px solid var(--color-border)',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center', // Center everything text-wise initially
                                }}
                            >
                                {/* Top Left Badge text for STANDARD/PREMIUM */}
                                {pkg.badgeText && (
                                    <div style={{
                                        alignSelf: 'flex-start',
                                        color: 'var(--color-primary)',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        letterSpacing: '0.5px',
                                        marginBottom: '30px',
                                        textTransform: 'uppercase'
                                    }}>
                                        {pkg.badgeText}
                                    </div>
                                )}

                                {/* Centered Name and Price */}
                                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', margin: '0 0 10px 0', fontWeight: 'bold', textAlign: 'center' }}>
                                    {pkg.name}
                                </h3>

                                <div style={{ fontSize: '2.8rem', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center' }}>
                                    <span style={{ fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '5px' }}>₹</span>
                                    {pkg.price?.replace('₹', '')}
                                </div>

                                {pkg.description && (
                                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.5', textAlign: 'center' }}>
                                        {pkg.description}
                                    </p>
                                )}

                                {/* Features List (Left Aligned) */}
                                <div style={{ marginTop: '10px', flexGrow: 1, width: '100%' }}>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {pkg.features?.map((feature: string, fIdx: number) => (
                                            <li key={`inc-${fIdx}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                                                <div style={{ minWidth: '24px', color: 'var(--color-primary)', fontSize: '18px', marginTop: '2px', fontWeight: 'bold' }}>
                                                    ✓
                                                </div>
                                                <span style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.5' }}>{feature}</span>
                                            </li>
                                        ))}

                                        {/* Unavailable Features (Cross marked and striked out) */}
                                        {pkg.unavailableFeatures?.map((feature: string, fIdx: number) => (
                                            <li key={`exc-${fIdx}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', opacity: 0.6 }}>
                                                <div style={{ minWidth: '24px', color: 'var(--color-primary)', fontSize: '18px', marginTop: '2px', fontWeight: 'bold' }}>
                                                    ✕
                                                </div>
                                                <span style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.5', textDecoration: 'line-through' }}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button style={{
                                    width: '100%',
                                    padding: '16px',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginTop: '40px',
                                    transition: 'background-color 0.2s',
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                                    onClick={() => {
                                        const priceValue = parseInt(pkg.price?.replace(/[₹,]/g, '') || '0');
                                        window.dispatchEvent(new CustomEvent('select-package', {
                                            detail: { name: pkg.name, price: priceValue }
                                        }));
                                        const contactSection = document.getElementById('contact');
                                        if (contactSection) {
                                            contactSection.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            window.location.href = '#contact';
                                        }
                                    }}
                                >
                                    Book Now
                                </button>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', width: '100%', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px dashed var(--color-primary)' }}>
                            <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', marginBottom: '10px' }}>No Packages Added Yet</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>You haven't added any packages to this tab in Sanity Studio.</p>
                        </div>
                    )}
                </div>

                {/* Customise Section */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '15px', fontWeight: '700', textAlign: 'center' }}>
                        Want To Customise Your Mentorship Plan?
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                        If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
                    {customizePackages.map((pkg, idx) => (
                        <div key={idx} style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            padding: '30px',
                            display: 'flex',
                            gap: '20px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                backgroundColor: 'var(--color-background-secondary)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem',
                                flexShrink: 0
                            }}>
                                {pkg.icon}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', margin: '0 0 8px 0', lineHeight: '1.3' }}>{pkg.title}</h3>
                                <div style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '12px' }}>{pkg.price}</div>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 20px 0', flexGrow: 1 }}>{pkg.description}</p>
                                <button style={{
                                    padding: '10px 24px',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    alignSelf: 'flex-start',
                                    fontSize: '0.95rem'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                                    onClick={() => {
                                        const priceValue = parseInt(pkg.price?.replace(/[₹,]/g, '') || '0');
                                        window.dispatchEvent(new CustomEvent('select-package', {
                                            detail: { name: pkg.title, price: priceValue }
                                        }));
                                        const contactSection = document.getElementById('contact');
                                        if (contactSection) {
                                            contactSection.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            window.location.href = '#contact';
                                        }
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
