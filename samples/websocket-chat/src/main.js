function Chat() {
    this.userName // 当前登录用户名;
    this.userImg; // 用户头像
    this.id; // 用户socketId
    this.userList = []; // 好友列表
    this.sendFriend = ''; // 当前聊天好友的用户socketId
    this.messageJson = {}; // 好友消息列表
}
Chat.prototype = {
    init() {
        this.handleClick();
        this.setAllPorarait();

        // 处理登录
        if (this.userName && this.userImg) {
            $("#login-wrap").style.display = 'none';
            this.login(this.userName, this.userImg);
        } else {
            $('.chat-btn').onclick = () => {
                let userName = $('.user-name').value;
                let userImg = $('.my-por').getAttribute('src');
                this.login(userName, userImg);
            }
        }
    },
    // 加载头像和表情
    setAllPorarait() {
        $.ajax({
            type: 'get',
            url: '/loadImg',
            success: function (data) {
                let emoji = data.emoji;
                let portrait = data.portrait;

                let str = '';
                portrait.forEach(item => {
                    str += `<img style="width: 60px;height: 60px;" src="static/portrait/${item}" />`
                });
                document.getElementById('portrait').innerHTML = str;

                str = '';
                emoji.forEach(item => {
                    str += `<img style="width: 30px;height: 30px;" src="static/emoticon/emoji/${item}" />`
                });
                $('.emoji').innerHTML = str;

            }
        })
    },
    // 处理点击事件
    handleClick() {
        // 头像选择事件
        $('.select').onclick = function (e) {
            $('.my-por').setAttribute('src', e.target.getAttribute('src'))
        }

        // 回车事件
        $('.inp').onkeydown = (e) => {

            if (e.code === 'Enter') {
                e.preventDefault ? e.preventDefault() : e.returnValue = false
                this.sendMessage();
            }
        }

        // 消息发送事件
        $('.send-message').onclick = () => {
            this.sendMessage();
        }

        // 选择表情事件
        $('.emoji').onclick = (e) => {
            this.chooseEmoji(e);
        }

    },
    // 登录
    login(userName, userImg) {
        if (userName && userImg) {
            // 发送login事件
            this.initSocket(userName, userImg);
        }
    },
    initSocket(userName, userImg) {
        window.socket = io();

        // 建立连接
        window.socket.on('connect', () => {
            $("#login-wrap").style.display = 'none';
            $('.chat-panel').style.display = 'block';
            this.userName = userName;
            this.userImg = userImg;
            this.id = window.socket.id;
            let userInfo = {
                id: window.socket.id,
                userName: userName,
                userImg: userImg
            }

            window.socket.emit('login', userInfo);

            this.setMyInfo();
        })

        // 获取用户列表
        window.socket.on('userList', (userList) => {
            this.userList = userList;
            this.drawUserList();
        })

        // 退出
        window.socket.on('quit', (id) => {
            this.userList = this.userList.filter(item => item.id != id)
            this.drawUserList();
        })

        // 接收消息
        window.socket.on('receiveMsg', data => {
            this.setMessageJson(data);

            if (data.sendId === this.sendFriend) {
                this.drawMessageList();
            } else {
                $('.me_' + data.sendId).innerHTML = parseInt($('.me_' + data.sendId).innerHTML) + 1;
                $('.me_' + data.sendId).style.display = 'block';
            }


        })

    },
    setMessageJson(data) {
        if (this.messageJson[data.sendId]) {
            this.messageJson[data.sendId].push(data)
        } else {
            this.messageJson[data.sendId] = [data];
        }
    },
    setMyInfo() {
        $('.my-info').innerHTML = `<div class="user-item" style="border-bottom: 1px solid #eee;margin-bottom: 30px;">
                            <img src="${this.userImg}"  style="width: 60px;height: 60px;">
                            <span>${this.userName}</span>
                        </div>`;
    },
    drawUserList() {
        let str = '';
        this.userList.forEach(item => {
            if (item.id !== this.id) {
                str += `<div class="user-item friend-item" onclick="changeChat(this)">
                            <img src="${item.userImg}"  style="width: 60px;height: 60px;">
                            <span>${item.userName}${item.id}</span>
                            <input type="hidden" value="${item.id}">
                            <div class="circle me_${item.id}" style="display: none;">0</div>
                        </div>`;
            }
        })
        $('.friends-info').innerHTML = str;
    },

    // 渲染消息列表界面
    drawMessageList() {
        let msg = '';
        if (!this.messageJson[this.sendFriend]) return;
        this.messageJson[this.sendFriend].forEach(item => {
            if (item.sendId === this.id) {
                msg += `<div class="msg-box right">
                            <div class="msg">${item.msg}</div>
                            <img src="${item.img}"  style="width: 60px;height: 60px;">
                        </div>`
            } else {
                msg += `<div class="msg-box left">
                            <img src="${item.img}"  style="width: 60px;height: 60px;">
                            <div class="msg">${item.msg}</div>
                        </div>`
            }
        })
        $('.message-box').innerHTML = msg;
        $('.message-box').scrollTop = $('.message-box').scrollHeight;
        $('.inp').innerHTML = '';
        $('.inp').focus();
    },

    // 发送消息
    sendMessage() {
        if (!this.sendFriend) {
            alert('请选择好友！');
        } else {
            let info = {
                sendId: this.id, // 发送者id
                id: this.sendFriend, // 接收者id
                userName: this.userName,
                img: this.userImg, // 发送者头像
                msg: $('.inp').innerHTML // 发送内容
            }
            window.socket.emit('sendMsg', info)
            // 设置聊天消息列表数据
            if (this.messageJson[this.sendFriend]) {
                this.messageJson[this.sendFriend].push(info)
            } else {
                this.messageJson[this.sendFriend] = [info];
            }
            // 页面绘制聊天消息
            this.drawMessageList();
        }
    },

    // 切换好友对话框
    changeChat(e) {
        $('.message-default').style.display = 'none';
        $('.message-wrapper').style.display = 'block';
        $('.friend').innerHTML = e.children[1].innerHTML;
        $('.inp').focus()

        if (e.children[2].value !== this.sendFriend) {
            $('.message-box').innerHTML = '';
            $('.message-box').scrollTop = 0;
            this.sendFriend = e.children[2].value;

            this.drawMessageList();
            $('.me_' + this.sendFriend).innerHTML = 0;
            $('.me_' + this.sendFriend).style.display = 'none';
        }
    },
    chooseEmoji(e) {
        hiddenBox();
        let path = e.target.getAttribute('src');

        $('.inp').innerHTML += `<img style="width: 24px;height: 24px;" src="${path}" />`;
    }
}
function changeChat(e) {
    chat.changeChat(e)
}

// 显示表情
function showEmojiBox() {
    $('.emoji').style.display = 'block';
    $('.mask').style.display = 'block';
}

// 隐藏表情
function hiddenBox() {
    $('.emoji').style.display = 'none';
    $('.mask').style.display = 'none';
}

// 初始化应用
let chat = new Chat();
chat.init()
