# ansible-playbook-ui
AnsiblePlaybook UI

ref http://docs.ansible.com/ansible/intro.html

```
brew install ansible
npm install ansible-playbook-ui
ln -s node_modules/ansible-playbook-ui/bin/www ansible-playbook-ui
ln -s /usr/local/etc/ansible/hosts node_modules/ansible-playbook-ui/playbook/hosts
node ansible-playbook-ui
```
* connect http://localhost:3000/
