Student Result Management Project

Folders:
- backend/   -> Node.js API (index.js, package.json, Dockerfile, data/results.json)
- frontend/  -> Static site (index.html, app.js, style.css, Dockerfile)
- Jenkinsfile
- k8s_*.yaml -> Example Kubernetes manifests for Dashboard manual creation

Quick commands:
# Run backend locally
cd backend
npm install
node index.js  # runs on 5000

# Serve frontend locally
cd frontend
python -m http.server 8080  # open http://localhost:8080

# Build docker images (example)
docker build -t <user>/student-backend:latest ./backend
docker build -t <user>/student-frontend:latest ./frontend

# Minikube: use local docker daemon or push images to DockerHub
eval $(minikube -p minikube docker-env)
docker build -t student-backend:local ./backend
docker build -t student-frontend:local ./frontend

# Deploy manually in Minikube Dashboard UI using the images above or push to DockerHub
