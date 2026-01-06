#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Vérifier si on est sur Vercel (plusieurs méthodes de détection)
const isVercel = process.env.VERCEL === '1' || 
                 process.env.VERCEL === 'true' || 
                 process.env.VERCEL_ENV !== undefined ||
                 !process.env.GITHUB_TOKEN

if (isVercel && !process.env.GITHUB_TOKEN) {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

  // Retirer @InRealArt/prisma-schema des devDependencies sur Vercel
  if (packageJson.devDependencies && packageJson.devDependencies['@InRealArt/prisma-schema']) {
    delete packageJson.devDependencies['@InRealArt/prisma-schema']
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8')
    console.log('✅ @InRealArt/prisma-schema retiré des devDependencies (pas de GITHUB_TOKEN disponible)')
  }

  // Sur Vercel, supprimer le package-lock.json pour forcer npm à le régénérer sans @InRealArt/prisma-schema
  // C'est plus fiable que d'essayer de modifier manuellement le fichier
  const packageLockPath = path.join(process.cwd(), 'package-lock.json')
  if (fs.existsSync(packageLockPath)) {
    const packageLockContent = fs.readFileSync(packageLockPath, 'utf8')
    if (packageLockContent.includes('@InRealArt/prisma-schema')) {
      fs.unlinkSync(packageLockPath)
      console.log('✅ package-lock.json supprimé (contient @InRealArt/prisma-schema), npm le régénérera sans cette dépendance')
    }
  }

  // Retirer aussi le .npmrc sur Vercel pour éviter les erreurs d'authentification
  const npmrcPath = path.join(process.cwd(), '.npmrc')
  if (fs.existsSync(npmrcPath)) {
    const npmrcContent = fs.readFileSync(npmrcPath, 'utf8')
    // Garder seulement legacy-peer-deps, retirer la config GitHub
    const newNpmrcContent = 'legacy-peer-deps=true\n'
    fs.writeFileSync(npmrcPath, newNpmrcContent, 'utf8')
    console.log('✅ .npmrc modifié pour retirer la configuration GitHub Packages')
  }
} else {
  console.log('ℹ️  Installation locale - @InRealArt/prisma-schema sera installé')
}

