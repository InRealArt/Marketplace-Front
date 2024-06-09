/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'landing-in-real-art.vercel.app',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'marketplace-front-ten.vercel.app',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'ipfs.io',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'jade-famous-rook-617.mypinata.cloud',
                pathname: '**',
            },
        ],
    }
}

module.exports = nextConfig
