variable "ssh_fingerprint" {}
variable "pvt_key" {}
variable "local_ipv4" {}

data "digitalocean_ssh_key" "terraform" {
  name = "digitalocean-nuxt-ssh"
}

resource "digitalocean_droplet" "web" {
  image  = "ubuntu-23-10-x64"
  name   = "nuxt-cms-droplet"
  region = "sfo3"
  size   = "s-1vcpu-1gb"
  ssh_keys = [
    data.digitalocean_ssh_key.terraform.fingerprint
  ]

  provisioner "remote-exec" {
    script = "${path.module}/provision/install-deps.sh"
  }

  provisioner "file" {
    source = "${path.module}/provision/ecosystem.config.json"
    destination = "/app/ecosystem.config.json"
  }

  provisioner "remote-exec" {
    script = "${path.module}/provision/npm-install.sh"
  }

  connection {
    type = "ssh"
    user = "root"
    private_key = file(var.pvt_key)
    host = "${digitalocean_droplet.web.ipv4_address}"
    timeout = "2m"
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