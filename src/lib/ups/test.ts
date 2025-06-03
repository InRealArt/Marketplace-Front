import { calculateShippingRates } from './rating'
import { UPS_CONFIG } from './config'

/**
 * Fonction de test pour valider l'intégration UPS
 * Utilisez cette fonction pour tester rapidement votre configuration
 */
export async function testUPSIntegration() {
    console.log('🧪 Test de l\'intégration UPS...')

    // Vérification de la configuration
    if (!UPS_CONFIG.CLIENT_ID || !UPS_CONFIG.CLIENT_SECRET) {
        console.error('❌ Configuration UPS manquante')
        return false
    }

    try {
        // Test avec une adresse française standard
        const testRequest = {
            shipperAddress: UPS_CONFIG.SHIPPER_ADDRESS,
            shipToAddress: {
                addressLine1: '10 Rue de Rivoli',
                city: 'Paris',
                stateProvinceCode: 'IDF',
                postalCode: '75001',
                countryCode: 'FR'
            },
            packages: [
                {
                    weight: 2.5, // 2.5 kg
                    length: 40,  // 40 cm
                    width: 30,   // 30 cm
                    height: 5    // 5 cm
                }
            ]
        }

        console.log('📦 Test avec un package de test...')
        const rates = await calculateShippingRates(testRequest)

        if (rates.length > 0) {
            console.log('✅ Test réussi ! Options de livraison trouvées :')
            rates.forEach(rate => {
                console.log(`  - ${rate.serviceName}: ${rate.totalCharges} ${rate.currency}`)
            })
            return true
        } else {
            console.log('⚠️  Aucun tarif retourné')
            return false
        }

    } catch (error) {
        console.error('❌ Erreur lors du test UPS:', error)
        return false
    }
}

/**
 * Test avec différents scénarios
 */
export async function runComprehensiveTest() {
    console.log('🧪 Test complet de l\'intégration UPS...')

    const testScenarios = [
        {
            name: 'Livraison France (Paris)',
            address: {
                addressLine1: '10 Rue de Rivoli',
                city: 'Paris',
                postalCode: '75001',
                countryCode: 'FR'
            }
        },
        {
            name: 'Livraison internationale (Londres)',
            address: {
                addressLine1: '10 Downing Street',
                city: 'London',
                postalCode: 'SW1A 2AA',
                countryCode: 'GB'
            }
        },
        {
            name: 'Livraison Europe (Berlin)',
            address: {
                addressLine1: 'Unter den Linden 77',
                city: 'Berlin',
                postalCode: '10117',
                countryCode: 'DE'
            }
        }
    ]

    for (const scenario of testScenarios) {
        console.log(`\n📍 Test : ${scenario.name}`)

        try {
            const testRequest = {
                shipperAddress: UPS_CONFIG.SHIPPER_ADDRESS,
                shipToAddress: scenario.address,
                packages: [
                    {
                        weight: 1.5,
                        length: 30,
                        width: 20,
                        height: 3
                    }
                ]
            }

            const rates = await calculateShippingRates(testRequest)

            if (rates.length > 0) {
                console.log(`✅ ${rates.length} option(s) trouvée(s)`)
                rates.forEach(rate => {
                    console.log(`  - ${rate.serviceName}: ${rate.totalCharges} ${rate.currency}${rate.transitTime ? ` (${rate.transitTime} jours)` : ''}`)
                })
            } else {
                console.log('⚠️  Aucun tarif disponible')
            }

        } catch (error) {
            console.error(`❌ Erreur pour ${scenario.name}:`, error instanceof Error ? error.message : error)
        }
    }
}

// Fonction utilitaire pour tester depuis la console ou un script
if (require.main === module) {
    runComprehensiveTest()
        .then(() => console.log('\n🏁 Tests terminés'))
        .catch(error => console.error('💥 Erreur fatale:', error))
} 