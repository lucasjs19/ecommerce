package com.example.shopping.services;

import com.example.shopping.model.entities.Client;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ClientService {
    Client saveClient(Client client);
    List<Client> getAllClients();
    Client getClientById(Long id);
    Client disableClient(Long id);
    Client activateClient(Long id);
    Client updateClientById (Client client);
}
