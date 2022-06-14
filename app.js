const formPanel = document.querySelector('.form-container')
const stepContainer = document.querySelector('.step-container')
const button = document.querySelector('.btn-wrapper')
const backBtn = document.querySelector('.btn-back')
const nextBtn = document.querySelector('.btn-next')

const bucket = document.querySelector('.bucket-content')
const free = document.querySelector('.free')
const total = document.querySelector('.total')

let totalNumber = 5298
let step = 1
let shipFee = 0

// handle circle-step, form, btn
function changeStepPage(e) {
  e.preventDefault()
  if (e.target.classList.contains('btn-next-center') && step < 3) {
    step += 1
    if (step === 3) {
      // circle step
      stepContainer.children[1].children[0].classList.add('checked')
      stepContainer.children[2].children[0].classList.add('active')
      stepContainer.children[2].children[1].classList.add('active')
      // form
      formPanel.children[1].classList.add('d-none')
      formPanel.children[2].classList.remove('d-none')
      // btn
      nextBtn.children[0].innerText = "確認下單"

    } else if (step > 1) {
      // circle step
      stepContainer.children[0].children[0].classList.add('checked')
      stepContainer.children[1].children[0].classList.add('active')
      stepContainer.children[1].children[0].children[0].classList.add('active')
      stepContainer.children[1].children[1].classList.add('active')
      // form
      formPanel.children[0].classList.add('d-none')
      formPanel.children[1].classList.remove('d-none')

      // btn
      backBtn.classList.remove('d-none')
    }
  } else if (e.target.classList.contains('btn-back-center')) {
    step -= 1
    if (step === 1) {
      // circle step
      stepContainer.children[0].children[0].classList.remove('checked')
      stepContainer.children[1].children[0].classList.remove('active')
      stepContainer.children[1].children[0].children[0].classList.remove('active')
      stepContainer.children[1].children[1].classList.remove('active')
      // form
      formPanel.children[0].classList.remove('d-none')
      formPanel.children[1].classList.add('d-none')
      // btn
      backBtn.classList.add('d-none')
    } else if (step === 2 && nextBtn.children[0].innerText === "確認下單") {
      // circle step
      stepContainer.children[1].children[0].classList.remove('checked')
      stepContainer.children[2].children[0].classList.remove('active')
      stepContainer.children[2].children[1].classList.remove('active')
      // form
      formPanel.children[1].classList.remove('d-none')
      formPanel.children[2].classList.add('d-none')
      // btn
      nextBtn.children[0].innerText = "下一步"
    }
  }
}

// handle ship fee
function controlBtn(e) {
  if (e.target.classList.contains('click-shipment')) {
    // 選 dhl
    if (e.target.classList.contains('dhl') && shipFee === 0) {
      // active >>外框; 
      e.target.classList.add('active')
      document.querySelector('.normal').classList.remove('active')
      free.innerText = '$500'
      shipFee = 500
      totalNumber += shipFee
      total.innerText = totalNumber.toLocaleString()
    } else if (!e.target.classList.contains('dhl') && shipFee === 500) {
      // 選一般的
      e.target.classList.add('active')
      document.querySelector('.dhl').classList.remove('active')
      free.innerText = '免費'
      shipFee = 0
      totalNumber -= 500
      total.innerText = totalNumber.toLocaleString()
    }
  }
}

// cart
function cartContent(e) {
  let piece = Number(e.target.parentElement.children[1].innerText)
  const pieceDollar = Number(e.target.parentElement.nextElementSibling.innerText.replace(",", ""))

  if (e.target.classList.contains('minus') && piece > 0) {
    piece -= 1
    e.target.parentElement.children[1].innerText = piece
    totalNumber -= pieceDollar
    total.innerText = totalNumber.toLocaleString()
  } else if (e.target.classList.contains('plus')) {
    piece += 1
    e.target.parentElement.children[1].innerText = piece
    totalNumber += pieceDollar
    total.innerText = totalNumber.toLocaleString()
  }
}

formPanel.addEventListener('click', controlBtn)
button.addEventListener('click', changeStepPage)
bucket.addEventListener('click', cartContent)