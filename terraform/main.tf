variable "ssh_fingerprint" {}
variable "pvt_key" {}
variable "local_ipv4" {}

data "digitalocean_ssh_key" "terraform" {
  name = "digitalocean-nuxt-ssh"
}

resource "digitalocean_droplet" "web" {
  image  = "docker-23-10"
  name   = "nuxt-cms-droplet"
  region = "sfo3"
  size   = "s-1vcpu-1gb"
  ssh_keys = [
    data.digitalocean_ssh_key.terraform.fingerprint
  ]

  provisioner "remote-exec" {
    inline = [ 
        "apt-get update",
        "apt-get -y install nodejs npm pm2",
        "git clone https://github.com/robertjhull/nuxt-cms /var/www/nuxt-cms",
        "cd /var/www/nuxt-cms && npm install && npm run build",
        "npm run start"
     ]

    connection {
        type = "ssh"
        user = "root"
        private_key = file(var.pvt_key)
        host = self.ipv4_address
        timeout = "2m"
    }
  }
}

resource "digitalocean_firewall" "nuxt_firewall" {
    name = "nuxt-cms-firewall"

    droplet_ids = [digitalocean_droplet.web.id]

    inbound_rule {
      protocol = "tcp"
      port_range = "22"
      source_addresses = [var.local_ipv4]
    }

    inbound_rule {
      protocol = "tcp"
      port_range = "80"
      source_addresses = ["0.0.0.0/0", "::/0"]
    }

    inbound_rule {
      protocol = "tcp"
      port_range = "443"
      source_addresses = ["0.0.0.0/0", "::/0"]
    }
}