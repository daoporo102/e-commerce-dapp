App = {
  web3Provider: null,
  contracts: {},
  currentAccount: null, // Track the connected account

  // Initialize the application
  init: async function() {
    // Load pets and initialize Web3
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },
  // Initialize web3
  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      web3 = new Web3(App.web3Provider);
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
      web3 = new Web3(App.web3Provider);
    } else {
      console.log('No Ethereum browser detected. You should consider trying MetaMask!');
    }

    return App.initContract();
  },
  // Initialize the contract
  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
      App.contracts.Adoption.setProvider(App.web3Provider);

      return App.markAdopted();
    });

    return App.bindEvents();
  },
  // Bind events to the buttons
  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', '#walletButton', App.toggleWalletConnection);
    $(document).on('click', '#historyButton', App.handleHistory);
  },

  // Check if the wallet is connected
  isWalletConnected: function() {
    return App.currentAccount !== null;
  },
  // Toggle wallet connection
  toggleWalletConnection: async function() {
    if (App.isWalletConnected()) {
      // Disconnect wallet
      App.currentAccount = null;
      $('#walletInfo').hide();
      $('#walletButton').text('Connect Wallet').removeClass('btn-danger').addClass('btn-primary');
    } else {
      // Connect wallet
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          App.currentAccount = accounts[0];

          // Display wallet info
          const walletName = await App.getWalletName(App.currentAccount);
          $('#walletName').text(walletName || 'Wallet');
          $('#walletAddress').text(`${App.currentAccount.substring(0, 6)}...${App.currentAccount.substring(App.currentAccount.length - 4)}`);
          $('#walletInfo').show();

          // Update button
          $('#walletButton').text('Disconnect Wallet').removeClass('btn-primary').addClass('btn-danger');
        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
      } else {
        alert('No Ethereum browser detected. Install MetaMask!');
      }
    }
  },
  // Retrieve wallet name
  getWalletName: async function(address) {
    if (window.ethereum && address) {
      try {
        // Use ENS to resolve the wallet name
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const ensName = await provider.lookupAddress(address);

        // Return the ENS name if it exists, otherwise return null
        return ensName || null;
      } catch (error) {
        console.error("Error retrieving wallet name:", error);
        return null;
      }
    }
    return null; // Return null if no name is available
  },
  // Mark adopted pets
  markAdopted: function() {
    var adoptionInstance;
    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          // Replace the button text to show it's adopted but keep button active
          $('.panel-pet').eq(i).find('button').text('Adopt');
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },
  // Handle the adoption process
  handleAdopt: async function(event) {
    event.preventDefault();

    if (!App.isWalletConnected()) {
      alert('Please connect your wallet first!');
      return App.toggleWalletConnection();
    }

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, { from: account });
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
