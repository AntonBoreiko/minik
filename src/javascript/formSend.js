
window.addEventListener('DOMContentLoaded', () => {
  const modalTrigger = document.querySelectorAll('[data-modal]')
  const modal = document.querySelector('.modal')
  const modalCloseBtn = document.querySelector('[data-close]')

  function openModal() {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimerId)
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal)
  })

  function closeModal() {
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
  }
  modalCloseBtn.addEventListener('click', closeModal)

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal()
    }
  })

  const modalTimerId = setTimeout(openModal, 30000)

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal()
      window.removeEventListener('scroll', showModalByScroll)
    }
  }
  window.addEventListener('scroll', showModalByScroll)

  //form
  const forms = document.querySelectorAll('form')


  const message = {
    loading: './img/spinner.svg',
    success: 'Спасибо! скоро мы с вами свяжемся',
    failure: 'Что то пошло не так...'
  }

  forms.forEach(item => {
    formSend(item)
  })

  forms.addEventListener('submit', formSend)

  async function formSend(event) {
    event.preventDefault()
    const statusMessage = document.createElement('img')
    statusMessage.src = message.loading
    statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `

    forms.insertAdjacentElement('afterend', statusMessage)

    let formData = new FormData(forms)

    if (error === 0) {
      let response = await fetch('sendmail.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: formData
      })
      if (response.ok) {
        let result = await response.json()
        showThanksModal(message.success)
        statusMessage.remove()
        forms.reset()
      } else {
        showThanksModal(message.failure)
        forms.reset()
      }
    } else {
      alert('Заполните обязательные поля')
    }
  }


  // function postData(form) {
  //   form.addEventListener('submit', (event) => {
  //     event.preventDefault()


  //     const statusMessage = document.createElement('img')
  //     statusMessage.src = message.loading
  //     statusMessage.style.cssText = `
  //               display: block;
  //               margin: 0 auto;
  //           `

  //     form.insertAdjacentElement('afterend', statusMessage)

  //     const formData = new FormData(form)


  //     const object = {}

  //     formData.forEach(function (value, key) {
  //       object[key] = value

  //     })

  //     fetch('server.php', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify(object)
  //     })
  //       .then(data => data.text())
  //       .then(data => {
  //         console.log(data)
  //         showThanksModal(message.success)
  //         statusMessage.remove()
  //       }).catch(() => {
  //         showThanksModal(message.failure)
  //       }).finally(() => {
  //         form.reset()
  //       })
  //   })
  // }


  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog')
    prevModalDialog.classList.add('hide')
    openModal()
    const thanksModal = document.createElement('div')
    thanksModal.classList.add('.modal__dialog')
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>❌</div>
            <div class="modal__title">${message}</div>
        </div>
        `
    document.querySelector('.modal').append(thanksModal)
    setTimeout(() => {
      thanksModal.remove()
      prevModalDialog.classList.add('show')
      prevModalDialog.classList.remove('hide')
      closeModal()
    }, 4000)
  }
})


