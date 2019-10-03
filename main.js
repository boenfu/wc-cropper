class Cropper extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: "open" });

    let style = window.document.createElement("style");

    style.textContent = Cropper._default_style;

    shadow.appendChild(style);

    let button = window.document.createElement("button");

    button.className = "wc-cropper-primary";
    button.innerText = "裁剪";
    button.onclick = this.open;

    shadow.appendChild(button);
  }

  open = () => {
    this.setAttribute("open", "true");
  };

  close = () => {
    this.removeAttribute("open");
  };

  get active() {
    let open = this.attributes.getNamedItem("open");
    return !!(open && open.value !== "false");
  }

  attributeChangedCallback() {
    if (this.active) {
      this.renderPopup();
    } else {
      this.destroyPopup();
    }
  }

  renderPopup() {
    let content = window.document.createElement("div");

    content.innerHTML = Cropper._popup_template;

    this.shadowRoot.appendChild(content);

    let closeIcon = this.shadowRoot.querySelector(".wc-cropper-header i");
    let cancelButton = this.shadowRoot.querySelector(
      ".wc-cropper-footer .wc-cropper-secondary "
    );

    closeIcon.onclick = this.close;
    cancelButton.onclick = this.close;

    this.popupContent = content;
  }

  destroyPopup() {
    this.shadowRoot.removeChild(this.popupContent);
  }

  static _popup_template = `
  <svg><symbol id="wc-cropper-guanbi" viewBox="0 0 1024 1024"><path d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"  ></path></symbol><symbol id="wc-cropper-shuaxin" viewBox="0 0 1024 1024"><path d="M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584C308.32 883.232 142.112 717.024 142.112 512S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z"  ></path></symbol><symbol id="wc-cropper-xiayibu" viewBox="0 0 1024 1024"><path d="M860.992 558.912C627.904 317.536 352.384 283.648 44.8 459.296a38.4 38.4 0 1 0 38.08 66.688c278.432-159.008 516.896-129.408 726.08 89.696L640 800h352V416l-131.008 142.912z"  ></path></symbol><symbol id="wc-cropper-shangyibu" viewBox="0 0 1024 1024"><path d="M995.648 459.296C684.448 281.568 406.08 318.656 171.232 567.904L32 416v384h352l-160.736-175.328c211.168-227.072 452.192-259.776 734.304-98.688a38.4 38.4 0 0 0 38.08-66.688z"  ></path></symbol><symbol id="wc-cropper-suoxiao" viewBox="0 0 1024 1024"><path d="M919.264 905.984l-138.912-138.912C851.808 692.32 896 591.328 896 480c0-229.376-186.624-416-416-416S64 250.624 64 480s186.624 416 416 416c95.008 0 182.432-32.384 252.544-86.208l141.44 141.44a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0.032-45.248zM128 480C128 285.92 285.92 128 480 128s352 157.92 352 352-157.92 352-352 352S128 674.08 128 480z"  ></path><path d="M625.792 448H336a32 32 0 0 0 0 64h289.792a32 32 0 1 0 0-64z"  ></path></symbol><symbol id="wc-cropper-fangda" viewBox="0 0 1024 1024"><path d="M919.264 905.984l-138.912-138.912C851.808 692.32 896 591.328 896 480c0-229.376-186.624-416-416-416S64 250.624 64 480s186.624 416 416 416c95.008 0 182.432-32.384 252.544-86.208l141.44 141.44a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0.032-45.248zM128 480C128 285.92 285.92 128 480 128s352 157.92 352 352-157.92 352-352 352S128 674.08 128 480z"  ></path><path d="M625.792 448H512v-112a32 32 0 0 0-64 0V448h-112a32 32 0 0 0 0 64H448v112a32 32 0 1 0 64 0V512h113.792a32 32 0 1 0 0-64z"  ></path></symbol></svg>
  <div class="wc-cropper-wrapper">
    <div class="wc-cropper-content">
      <div class="wc-cropper-header">
        <span>剪裁图片</span
        ><i>
          <svg class="wc-cropper" aria-hidden="true">
            <use xlink:href="#wc-cropper-guanbi"></use>
          </svg>
        </i>
      </div>
      <div class="wc-cropper-main">
        <div class="wc-cropper-left">
          <div class="wc-cropper-area"></div>
          <div class="wc-cropper-menu-wrapper">
            <ul class="wc-cropper-menu">
              <li title="左翻转">
                <svg class="wc-cropper" aria-hidden="true">
                  <use xlink:href="#wc-cropper-shangyibu"></use>
                </svg>
              </li>
              <li title="右翻转">
                <svg class="wc-cropper" aria-hidden="true">
                  <use xlink:href="#wc-cropper-xiayibu"></use>
                </svg>
              </li>
              <li title="缩小">
                <svg class="wc-cropper" aria-hidden="true">
                  <use xlink:href="#wc-cropper-suoxiao"></use>
                </svg>
              </li>
              <li title="放大">
                <svg class="wc-cropper" aria-hidden="true">
                  <use xlink:href="#wc-cropper-fangda"></use>
                </svg>
              </li>
              <li title="旋转45°">
                <svg class="wc-cropper" aria-hidden="true">
                  <use xlink:href="#wc-cropper-shuaxin"></use>
                </svg>
              </li>
            </ul>
          </div>
        </div>
        <div class="wc-cropper-right">
          <div class="wc-cropper-square"></div>
          <div class="wc-cropper-circle"></div>
          <button class="wc-cropper-secondary">选择图片</button>
          <input type="file" />
        </div>
      </div>
      <div class="wc-cropper-footer">
        <button class="wc-cropper-secondary">取消</button>
        <button class="wc-cropper-primary">确认</button>
      </div>
    </div>
  </div>
  `;

  static _default_style = `
  .wc-cropper {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .wc-cropper-wrapper {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .wc-cropper-content {
    width: 680px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 12px #bbb;
  }

  .wc-cropper-header,
  .wc-cropper-footer,
  .wc-cropper-main {
    display: flex;
    align-items: center;
    padding: 0 16px;
  }

  .wc-cropper-header {
    height: 48px;
    border-bottom: 1px solid #eee;
  }

  .wc-cropper-header span {
    flex: 1;
  }

  .wc-cropper-header i {
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    color: #666;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  .wc-cropper-header i:hover {
    background-color: #eee;
    transform: rotateZ(90deg);
  }

  .wc-cropper-main {
    display: flex;
    height: 380px;
  }

  .wc-cropper-left,
  .wc-cropper-right {
    height: 100%;
  }

  .wc-cropper-left {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .wc-cropper-area {
    flex: 1;
    border-radius: 2px;
    background-size: 18px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAABcCAYAAAAMLblmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHYcAAB2HAY/l8WUAAAUeSURBVHhe7Z3XbiQ5DEX7/3/L45xzgHN2O+dsLQ6B21Pr9cM+DHA5AAlcSMXyg3REUeoHlnu7u7vt6OionZ6eptHJyUk7Pj6O9uzsLIS/O07eb29vt83Nzba1tZVCjGV9fT36Ozs70TJGtLGx0VZWVqLtra6utvPz8/b5+ZlKLy8v7fn5ub29vYVeX1/b09NT+GkvLy/b2tpam56ebuPj42k0NjbWZmdn2/z8fIyNdmFhIXxTU1MBPiL99vb2x4k79PX11TD6Hx8fAx8t8NUyZibARJhcBjEWwM/MzATk0dHR8M/NzQ2gsxN6h4eH7eHhISaTRUAGOJLhF/T39/d2f3/flpaW2uTkZEwog4ANWKIb0L9+/Ypn+oh+pJe9vb2YQBZTVJNaEM8I0AQHCyHobFsii8lkEFENcHYgYxsaGgo/PqWbgE56yQQdE2QiW8ZCkNcV8Tc3N215efk/E3dL4InskZGR8LED8LMrOYdSQse+pxelHFqgX19fNy4BTOb7xJ2amJgYpBtyOj4B5x1jLuh/WAXdoIJuUEE3qKAbVNANKugGFXSDCrpBBd2ggm5QQTeooBtU0A0q6AYVdIMKukEF3aCCblBBN6igG1TQDSroBhV0gwq6QQXdoIJuUEE3qKAbVNANKugGFXSDCrpB/ws6NY5UqmWz79Ape6GcUYVe3eq6TKIGStCHh4fDRx/wvIuSRgpMM0IHLCKy9fz4+DhYDIq+VHPEhDJI0FXC2K2uo+6IyF9cXPxd0pjFgNytrgMwz7Qq9KLPAii9KLLcAiyi1BJRyMv48LEYLAJFYL39/f12d3c3iCC3gIrI20DGp4VQn3fsTiKdXJlJ5G0iG7hAl49KO6BHpJPTr66uBts5gwALYPpaDARsfJSpU1qv4l2iKIt0eBLdQAc4ws9z5HQ+IkCdvSLMLcHWNwBII6Q/blhEN/WjFxcX8XEGajIpkiWysog0Q5RrXLQSQQLvqJjOJlLeT/rp7w4ODhrnUgYRCHydA9GX9J6xMuYeTg4kbYMM0jWrGyWIfIjYoqRFIp4dwI7IIH21g1bP7FSJs5PPqPSgz4HUvfo4RY7mfgt8nlkALYbyN36+JkG6IR1xBmRS92xS2lSfH3U9PgZDDmJCWQRoxkRUE/E84we2bgQEiqBrYhnEeHTdxboLgHEmxe2FCSqa3AIwBxBQSSNABza3AVIMfwN0DqVMV10JwEongCbdcCkQ+IBOTmdyTCyTAKxgADLwGad+gNDP9KOua/y+ALT6yu/shICunE6EZZCgA1m/5ICuSFea4fDnENW2zWSKeEwLgG8Q6Vxh2Ko/AXBJ4OkLuhaCZ/zc0UkvRE82A66CAehIFgdpQf/zVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtANVtAN9ldCR6otUs3R31D+wlgIAoq7EAZw6o0oh+Hdv6ArutwCONFMVFNl1y306ta7dgu9FFluAZXaIgq7VF0HdPr4AM93GAI6k2FSGQRg/iG2PmbA1yOQFoIWP2NWpGcS4AGt6jqeJd5HpFPHTtQw2QwCqiqmFfUq2AW6/IyZCag+M4MAy3hUvItPlXa0KCL95OQkDqXvk3dJ+VzfAqCWlDRDSxrUlyUYc7/fj62rHOoW0c3uo2yRam6eSYEc+Pjp9/v99g9FavxToWrNSwAAAABJRU5ErkJggg==);
    margin: 10px 0;
  }

  .wc-cropper-menu-wrapper {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
  }

  .wc-cropper-menu {
    list-style: none;
    display: flex;
  }

  .wc-cropper-menu li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 30px;
    border: 1px solid #ddd;
    border-width: 1px 0 1px 1px;
    cursor: pointer;
    transition: all 0.2s ease-out;
    color: #666;
  }

  .wc-cropper-menu li:hover {
    background-color: #eee;
  }

  .wc-cropper-menu li:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .wc-cropper-menu li:last-child {
    border-width: 1px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .wc-cropper-right {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 148px;
  }

  .wc-cropper-square,
  .wc-cropper-circle {
    width: 100px;
    height: 100px;
    margin: 20px 0;
    background-color: #eee;
  }

  .wc-cropper-circle {
    border-radius: 50%;
  }

  .wc-cropper-right input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .wc-cropper-footer {
    height: 48px;
    border-top: 1px solid #eee;
    justify-content: flex-end;
  }

  .wc-cropper-primary,
  .wc-cropper-secondary {
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    padding: 8px 18px;
    margin: 0 2px;
    border-radius: 4px;
    color: #222;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  .wc-cropper-secondary:hover {
    background-color: #eee;
  }

  .wc-cropper-primary {
    background-color: #00cc00;
    color: #fff;
  }

  .wc-cropper-primary:hover {
    filter: brightness(1.1);
  }
 `;

  static get observedAttributes() {
    return ["open"];
  }
}

window.customElements.define("wc-cropper", Cropper);
