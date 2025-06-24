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


// pipeline {
//     agent any

//     tools {
//         nodejs 'Node16' // Adjust if your Jenkins uses a different Node version
//     }

//     environment {
//         RENDER_DEPLOY_URL = 'https://my-ip-28ez.onrender.com'  // Replace with your Render URL
//         SLACK_CHANNEL = '#all-austinip1' // This should match the configured Slack channel
//     }

//     stages {
//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 sh 'npm test'
//             }
//             post {
//                 failure {
//                     mail to: 'cutleraustin@gmail.com',
//                          subject: "❌ Test Failure: Build #${env.BUILD_NUMBER}",
//                          body: "Tests failed. Please check the Jenkins console output."
//                 }
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 echo 'Deployment to Render triggered (manually or by webhook)'
//                 // You can optionally use curl to hit a webhook
//                 // sh 'curl -X POST https://api.render.com/deploy/some-hook'
//             }
//         }
//     }

//     post {
//         always{
//             script{
//                 if( currentBuild.result == 'SUCCESS' ) {
//                     slackSend (
//                         channel: "${env.SLACK_CHANNEL}",
//                         message: "✅ SUCCESS: Build #${env.BUILD_NUMBER} is deployed at ${env.RENDER_DEPLOY_URL}"
//                     )
//                 } else {
//                     slackSend (
//                         channel: "${env.SLACK_CHANNEL}",
//                         message: "❌ FAILURE: Build #${env.BUILD_NUMBER}. Please check Jenkins logs."
//                 }
//                 }
//             }
//         )
        
//     }

//     // triggers {
//     //     pollSCM('H/5 * * * *') // Poll GitHub every 5 minutes
//     // }
// }






pipeline {
    agent any

    tools {
        nodejs 'Node16'  // Make sure 'Node16' is installed in Jenkins (Manage Jenkins > Global Tool Configuration)
    }

    environment {
        RENDER_DEPLOY_URL = 'https://my-ip-28ez.onrender.com'  // Replace with your real Render deployment URL
        SLACK_CHANNEL = '#all-austinip1'
        SLACK_CREDENTIAL_ID = 'slack-bot'
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
        }

        stage('Deploy') {
            steps {
                echo "Triggering deployment to Render..."
                // Uncomment below to use a Render Deploy Hook:
                // sh 'curl -X POST https://api.render.com/deploy/some-deploy-hook-id'
            }
        }
    }

    post {
        success {
            slackSend (
                channel: "${env.SLACK_CHANNEL}",
                color: 'good',
                message: "✅ SUCCESS: Build #${env.BUILD_NUMBER} is live at ${env.RENDER_DEPLOY_URL}"
            )
        }

        failure {
            slackSend (
                channel: "${env.SLACK_CHANNEL}",
                color: 'danger',
                message: "❌ FAILURE: Build #${env.BUILD_NUMBER}. Check Jenkins for logs."
            )

            mail to: 'cutleraustin@gmail.com',
                 subject: "❌ Build Failed: #${env.BUILD_NUMBER}",
                 body: "Your Jenkins build has failed.\n\nView details in Jenkins for debugging."
        }

        always {
            echo "Build #${env.BUILD_NUMBER} completed. Status: ${currentBuild.result}"
        }
    }

    Optional: Poll GitHub every 5 minutes
    triggers {
        pollSCM('H/5 * * * *')
    }
}



