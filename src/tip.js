const web3 = new Web3(Web3.givenProvider)

const form = document.querySelector("form")
const noEth = document.querySelector(".noEth")

const send = async function (amount) {
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

  const wei = web3.utils.toWei(amount, "ether")
  
  if (accounts.length > 0) {
    window.ethereum.request({ 
      method: "eth_sendTransaction", 
      params: [{
        from: accounts[0],
        to: "0x478410d057f11c24c5bfd633efb7e5137d01403f",
        value: web3.utils.toHex(wei)
      }]
     })
  }
}

if (window.ethereum) {
  form.classList.add("has-eth")
} else {
  noEth.style.display="flex"
}

form.addEventListener("submit", function (event) {
  event.preventDefault()

  if (window.ethereum) {
    const input = form.querySelector("input")
    send(input.value)
  } else {
    alert("Please install a wallet")
  }

})