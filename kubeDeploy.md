how to deploy web app using azure kubernetes services:



1) First create kubernetes cluster using azure kubernetes services and select a amchine(eg. bs2) and deploy
2) open azure cloud shell and clone ur git repository by running the following command

git clone "link"

3) connect your kubernetes cluster to ur azure cloud shell by clicking on connect button appear in your cluster resource and copy the commands and run those commmand in cloud shell

4)now search for container registry in search button of azure portal and click on create in container registries services

5) after creating container registry copy the "login server url", username and password 

6) In cloud shell,
    docker login <login server_url>
    username: <username>
    password: <pasword>

7) Change directory into project directory containing Dockerfile

8) Now build a docker image 
    docker build -t <login server_url>/image_name .

9) Integrate Azure Container Registry with Azure Kubernetes cluster
    az aks update -n <aks-cluster-name> -g <resource-group-name> --attach-acr <acr-name>

10) change directory into directory containing kubernetes deployment file
    cd infra/k8s

11) apply deployment configuration which will create deployment and service on our kubernetes cluster
    kubectl apply -f file_name.yaml


12) To see whether the deployment is successfull or not run
    kubectl get pods

    now if status of pod is running then deployment is successfull

13) Now find ip and port to access the deployment outside of kubernetes cluster
    kubectl get svc

    Now copy external ip and port for service of type LoadBalancer

14) Paste ip:PORT into browser
