// pipeline {
//     agent any

//     tools {
//         nodejs 'Node16' // Ensure Node.js is configured in Jenkins > Global Tool Configuration
//     }

//     environment {
//         RENDER_DEPLOY_URL = 'https://my-ip-28ez.onrender.com' // Update this with your actual Render URL
//         SLACK_CHANNEL = '#cutleraustin5' // Replace with your actual Slack channel
//     }

//     stages {
//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Test') {
//             steps {
//                 sh 'npm test'
//             }
//             post {
//                 failure {
//                     mail to: 'cutleraustin5@gmail.com',
//                          subject: "❌ Tests Failed: Build #${env.BUILD_NUMBER}",
//                          body: "Check Jenkins build logs for more details."
//                 }
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 echo 'Simulate deployment to Render'
//                 // Uncomment one of the below depending on how Render deploys
//                 // Option 1: Auto-deploy via GitHub - no action needed
//                 // Option 2: Webhook trigger
//                 // sh 'curl -X POST https://api.render.com/deploy/some-hook'
//                 echo "Deployment triggered (manually or via webhook)."
//             }
//         }
//     }

//     post {
//         success {
//             slackSend (
//                 channel: "${env.SLACK_CHANNEL}",
//                 message: "✅ SUCCESS: Build #${env.BUILD_NUMBER} - Deployed: ${env.RENDER_DEPLOY_URL}"
//             )
//         }
//         failure {
//             slackSend (
//                 channel: "${env.SLACK_CHANNEL}",
//                 message: "❌ FAILURE: Build #${env.BUILD_NUMBER}. Please check Jenkins logs."
//             )
//         }
//     }

//     triggers {
//         pollSCM('H/5 * * * *') // Poll GitHub every 5 minutes — switch to webhook for efficiency
//     }
// }


pipeline {
    agent any

    tools {
        nodejs 'Node16' // Adjust if your Jenkins uses a different Node version
    }

    environment {
        RENDER_DEPLOY_URL = 'https://my-ip-28ez.onrender.com'  // Replace with your Render URL
        SLACK_CHANNEL = '#all-austinip1' // This should match the configured Slack channel
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    mail to: 'cutleraustin@gmail.com',
                         subject: "❌ Test Failure: Build #${env.BUILD_NUMBER}",
                         body: "Tests failed. Please check the Jenkins console output."
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment to Render triggered (manually or by webhook)'
                // You can optionally use curl to hit a webhook
                // sh 'curl -X POST https://api.render.com/deploy/some-hook'
            }
        }
    }

    post {
        success {
            slackSend (
                channel: "${env.SLACK_CHANNEL}",
                message: "✅ SUCCESS: Build #${env.BUILD_NUMBER} is deployed: ${env.RENDER_DEPLOY_URL}"
            )
        }
        failure {
            slackSend (
                channel: "${env.SLACK_CHANNEL}",
                message: "❌ FAILURE: Build #${env.BUILD_NUMBER}. Please check Jenkins logs."
            )
        }
    }

    triggers {
        pollSCM('H/5 * * * *') // Poll GitHub every 5 minutes
    }
}
