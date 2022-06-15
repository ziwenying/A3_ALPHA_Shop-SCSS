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

const itemIcon = document.querySelector('.item-icon')
let mode = 'sun'

// handle circle-step, form, btn
function changeStepPage(e) {
  e.preventDefault()
  // click next
  if (e.target.classList.contains('btn-next-center') && step < 3) {
    step += 1
    if (step === 3) {
      // circle step 2 -> 3
      // 前個步驟打勾
      stepContainer.children[1].children[0].classList.add('checked')
      // 圓圈數字和外圍變黑
      stepContainer.children[2].children[0].classList.add('active')
      // 下個步驟文字變黑
      stepContainer.children[2].children[1].classList.add('active')
      // form
      // page two 隱藏
      formPanel.children[1].classList.add('d-none')
      // page three 顯示
      formPanel.children[2].classList.remove('d-none')
      // btn
      nextBtn.children[0].innerText = "確認下單"

    } else if (step === 2) {
      // circle step 1 -> 2
      // 前個步驟打勾
      stepContainer.children[0].children[0].classList.add('checked')
      // 圓圈數字和外圍變黑
      stepContainer.children[1].children[0].classList.add('active')
      // 線段變黑
      stepContainer.children[1].children[0].children[0].classList.add('active')
      // 下個步驟文字變黑
      stepContainer.children[1].children[1].classList.add('active')
      // form
      // page one 隱藏
      formPanel.children[0].classList.add('d-none')
      // page two 顯示
      formPanel.children[1].classList.remove('d-none')

      // btn
      backBtn.classList.remove('d-none')
    }
  } else if (e.target.classList.contains('btn-back-center')) {
    // click back
    step -= 1
    if (step === 1) {
      // circle step 2 -> 1
      // 1 checked 拿掉
      stepContainer.children[0].children[0].classList.remove('checked')
      // 2 移除 active 狀態
      stepContainer.children[1].children[0].classList.remove('active')
      // 線段變淡
      stepContainer.children[1].children[0].children[0].classList.remove('active')
      // 原本步驟 2 文字變淡
      stepContainer.children[1].children[1].classList.remove('active')
      // form
      formPanel.children[0].classList.remove('d-none')
      formPanel.children[1].classList.add('d-none')
      // btn 隱藏
      backBtn.classList.add('d-none')
    } else if (step === 2 && nextBtn.children[0].innerText === "確認下單") {
      // circle step 3 -> 2
      // 2 checked 拿掉
      stepContainer.children[1].children[0].classList.remove('checked')
      // 3 移除 active 狀態變淡
      stepContainer.children[2].children[0].classList.remove('active')
      // 原本步驟 3 文字變淡
      stepContainer.children[2].children[1].classList.remove('active')
      // form
      formPanel.children[1].classList.remove('d-none')
      formPanel.children[2].classList.add('d-none')
      // btn 確認下單改回下一步
      nextBtn.children[0].innerHTML = `
        <p class="btn-next-center">
          下一步
        <img src="./src/image/arrow02.png" alt="" class="arrow btn-next-center">
        </p>
      `
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
      // 總金額加運費，並改變畫面
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
  // 件數
  let piece = Number(e.target.parentElement.children[1].innerText)
  // 把逗號拿掉取得商品金額
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

function changeMode(e) {
  if (e.target.classList.contains('toggle-mode') && mode === 'sun') {
    // 變黑 換太陽 icon
    mode = 'moon'
    document.documentElement.setAttribute("data-theme", "dark");

  } else if (e.target.classList.contains('toggle-mode') && mode === 'moon') {
    // 變白 換月亮 icon
    mode = 'sun'
    document.documentElement.setAttribute("data-theme", "light");
  }
}


formPanel.addEventListener('click', controlBtn)
button.addEventListener('click', changeStepPage)
bucket.addEventListener('click', cartContent)
itemIcon.addEventListener('click', changeMode)