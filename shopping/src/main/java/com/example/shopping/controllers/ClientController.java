package com.example.shopping.controllers;

import com.example.shopping.model.entities.Client;
import com.example.shopping.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClientController {
    @Autowired
    private ClientService clientService;
    @GetMapping("/clients/{id}")
    public Client getClientById(@PathVariable("id") Long id){
        return clientService.getClientById(id);
    }
    @GetMapping("/clients")
    public List<Client> getAllClients (){
        return clientService.getAllClients();
    }

    @PostMapping("/client")
    public Client saveClients(@RequestBody Client client){
        return clientService.saveClient(client);
    }

    @PutMapping("/client/update")
    public Client updateClientById (@RequestBody Client client){
        return clientService.updateClientById(client);
    }
    @PutMapping("/client/disable/{id}")
    public Client disableClient (@PathVariable("id") Long id) {return clientService.disableClient(id);}

    @PutMapping("/client/activate/{id}")
    public Client activateClient (@PathVariable("id") Long id) {return clientService.activateClient(id);}
}
