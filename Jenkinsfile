pipeline {
    agent any

    tools {
        nodejs 'austin' 
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/Austill/my_IP.git'
            }
        }

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
                    echo 'Tests failed.'
                    emailext(
                        subject: "Jenkins Build #${env.BUILD_NUMBER} Failed",
                        body: "Build failed during tests. Please check Jenkins logs for more details.",
                        to: 'cutleraustin5@gmail.com'
                    )
                    error('Tests did not pass.')
                }
                success {
                    echo 'Tests passed.'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Deploy to render'
                sh "curl -X POST https://api.render.com/deploy/srv-d1bfj7er433s739ir9jg?key=5ATnSjZh2qk"
            }
            post {
                success {
                    slackSend(
                        channel: '#all-austinip1',
                        color: 'good',
                        message: "Deployment Successful! Build #${env.BUILD_NUMBER} deployed: https://my-ip-28ez.onrender.com",
                        teamDomain: 'austin_ip1',
                        tokenCredentialId: 'slack-bot',
                        botUser: true
                    )
                    }
                        }   
        }
    }

    post {
        success {
            echo 'Build and deploy successful.'
        }
        always {
            echo 'Pipeline complete.'
        }
    }
}

