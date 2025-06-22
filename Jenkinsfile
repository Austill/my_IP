pipeline {
    agent any

    tools {
        nodejs 'Node16' // You must have this configured in Jenkins > Global Tool Configuration
    }

    environment {
        RENDER_DEPLOY_URL = 'https://your-app.onrender.com' // Update this with your Render URL
        SLACK_CHANNEL = '#Austin_IP1' // Replace with your Slack channel
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
                    mail to: 'you@example.com',
                         subject: "❌ Test Failure: Build #${env.BUILD_NUMBER}",
                         body: "Tests failed. Please check the Jenkins console output."
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Simulate deployment to Render'
                // Option 1: Use Render auto-deploy from GitHub, no script needed
                // Option 2: If webhook-based, trigger it via curl
                // sh 'curl -X POST https://api.render.com/deploy/some-hook'
                echo "Deployment triggered (manually or by webhook)."
            }
        }
    }

    post {
        success {
            slackSend (
                channel: "${env.SLACK_CHANNEL}",
                message: "✅ SUCCESS: Build #${env.BUILD_NUMBER} - Deployed: ${env.RENDER_DEPLOY_URL}"
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
        pollSCM('H/5 * * * *') // Poll GitHub every 5 minutes (replace with webhook for efficiency)
    }
}
