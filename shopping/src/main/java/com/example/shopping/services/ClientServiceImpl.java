package com.example.shopping.services;

import com.example.shopping.model.entities.Client;
import com.example.shopping.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public List<Client> getAllClients() {
        List<Client> allClients = clientRepository.findAll();
        return allClients;
    }

    @Override
    public Client getClientById(Long id) {
        Optional<Client> client = clientRepository.findById(id);
        if (client.isPresent()) {
            return client.get();
        }
        return null;
    }

    @Override
    public Client disableClient(Long id) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();
            client.setActive(false);
            return clientRepository.save(client);
        } else {
            throw new RuntimeException("Cliente não encontrado com o ID: " + id);
        }
    }

    @Override
    public Client activateClient(Long id) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();
            client.setActive(true);
            return clientRepository.save(client);
        } else {
            throw new RuntimeException("Cliente não encontrado com o ID: " + id);
        }
    }

    @Override
    public Client updateClientById(Client client) {
        return clientRepository.save(client);
    }
}
