#!/usr/bin/env node

/**
 * SETUP SCRIPT
 * Automates creation of a new website instance from this template
 * 
 * Steps:
 * 1. Create new Sanity project
 * 2. Create production dataset
 * 3. Import starter content
 * 4. Configure environment variables
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve))
}

async function setup() {
  console.log('\n🚀 Welcome to Template Setup!\n')
  console.log('This script will create a new Sanity project and configure your environment.\n')

  try {
    // Step 1: Check if Sanity CLI is installed
    console.log('📦 Checking Sanity CLI...')
    try {
      execSync('sanity --version', { stdio: 'ignore' })
      console.log('✅ Sanity CLI found\n')
    } catch {
      console.log('❌ Sanity CLI not found. Installing...')
      execSync('npm install -g @sanity/cli', { stdio: 'inherit' })
      console.log('✅ Sanity CLI installed\n')
    }

    // Step 2: Create new Sanity project
    console.log('🏗️  Creating new Sanity project...')
    const projectName = await question('Enter project name: ')
    
    process.chdir('./sanity')
    execSync(`sanity init --project-name "${projectName}" --dataset production --create-project`, {
      stdio: 'inherit',
    })

    // Step 3: Get project ID
    console.log('\n📝 Fetching project details...')
    const projectId = execSync('sanity debug --secrets', { encoding: 'utf-8' })
      .match(/projectId: ([a-z0-9]+)/)?.[1]

    if (!projectId) {
      throw new Error('Could not retrieve project ID')
    }

    console.log(`✅ Project created: ${projectId}\n`)

    // Step 4: Import starter dataset (if exists)
    const starterDataPath = path.join(process.cwd(), 'starter-data.tar.gz')
    if (fs.existsSync(starterDataPath)) {
      console.log('📥 Importing starter content...')
      execSync(`sanity dataset import ${starterDataPath} production --replace`, {
        stdio: 'inherit',
      })
      console.log('✅ Starter content imported\n')
    } else {
      console.log('⚠️  No starter dataset found. Skipping import.\n')
    }

    // Step 5: Create .env.local
    process.chdir('..')
    const envContent = `# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
`

    fs.writeFileSync('.env.local', envContent)
    console.log('✅ .env.local created\n')

    // Success!
    console.log('🎉 Setup complete!\n')
    console.log('Next steps:')
    console.log('  1. cd sanity && sanity manage  (to get API token)')
    console.log('  2. Add SANITY_API_TOKEN to .env.local')
    console.log('  3. npm run dev')
    console.log('\n')
  } catch (error) {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  } finally {
    rl.close()
  }
}

setup()
