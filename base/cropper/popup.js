class PopupDialog extends HTMLElement {

  handleEsc = null
  constructor() {
    super();
    // 创建影子DOM
    this.attachShadow({ mode: 'open' });
    // 设置初始样式
    this.shadowRoot.innerHTML = `
      <style>
        .popup-container {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .popup-content {

          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      </style>
      <div class="popup-container">
        <div class="popup-content">
          <slot></slot>
          <button id="close-button">关闭</button>
          <button id="ok-button">确定</button>
        </div>
      </div>
    `;
    // 获取关闭按钮
    this.closeButton = this.shadowRoot.getElementById('close-button');
    // 添加事件监听器以关闭弹窗
    this.closeButton.addEventListener('click', () => {
      this.$close();
    });
    this.mask = this.shadowRoot.querySelector('.popup-container')
    this.mask.addEventListener('click', () => {
      this.$close()
    })
    this.container = this.shadowRoot.querySelector('.popup-content')
    this.container.addEventListener('click', e => {
      e.stopPropagation()
    })

    this.okButton = this.shadowRoot.getElementById('ok-button')
    this.okButton.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('confirm')
      )
    })

  
  }

  connectedCallback() {
  }

  disconnectedCallback() {
    this.unlisten()
  }

  $open() {
    const popupContainer = this.shadowRoot.querySelector('.popup-container');
    popupContainer.style.display = 'flex';
    this.listen()
   
  }


  listen() {
    this.handleEsc = e=> {
      if (e.key ==='Escape') {
        this.$close()
      }
    }
    window.addEventListener('keydown',this.handleEsc)
  }

  unlisten() {
    window.removeEventListener('keydown', this.handleEsc)
  }
 
  $close() {
    const popupContainer = this.shadowRoot.querySelector('.popup-container');
    popupContainer.style.display = 'none';
    this.unlisten()
  }
}

window.customElements.define('popup-dialog', PopupDialog);