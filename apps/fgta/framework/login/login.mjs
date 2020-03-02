'use strict'

const pnl_exitbar = $('#pnl_exitbar');
const btn_exit = $('#btn_exit');
const btn_login = $('#btn_login');
const btn_test = $('#btn_test');

const obj = {
	txt_username: $('#obj_txt_username'),
	txt_password: $('#obj_txt_password'),
	chk_rememberme: $('#obj_chk_rememberme')
}

const api = {
	dologin: 'fgta/framework/login/dologin'
}



export async function init() {

	obj.txt_username.textbox('textbox').bind('keypress', (evt)=>{
		txt_username_keypress(evt)
	})	

	obj.txt_password.textbox('textbox').bind('keypress', (evt)=>{
		txt_password_keypress(evt)
	})



	btn_login.linkbutton({
		onClick: ()=> { btn_login_click() }
	})



	obj.chk_rememberme.checked = false
	obj.chk_rememberme.checkbox({
		checked: obj.chk_rememberme.checked,
		onChange: (checked) => { chk_rememberme_checkedchange(checked) }
	})

	setTimeout(()=>{
		obj.txt_username.textbox('textbox').focus()
		obj.txt_username.textbox('resize', '100%')
		obj.txt_password.textbox('resize', '100%')
	}, 400)	
}


function txt_username_keypress(evt) {
	let username = obj.txt_username.textbox('getText')
	if (evt.key==='Enter') {
		if (username.trim()!=='') {
			obj.txt_password.textbox('textbox').focus()
		}
	}
}

function txt_password_keypress(evt) {
	let password = obj.txt_password.textbox('getValue')
	if (evt.key==='Enter') {
		btn_login_click()
	}	
}

function chk_rememberme_checkedchange(checked) {
	obj.chk_rememberme.checked=checked
}

function btn_login_click() {
	let username = obj.txt_username.textbox('getText')
	let password = obj.txt_password.textbox('getValue')

	let ajax_args = {
		username: username,
		password: password
	}

	let ajax_dologin = async (args, fn_callback) => {
		let apiurl = api.dologin
		try {
			let result = await $ui.apicall(apiurl, args)
			fn_callback(null, result)
		} catch (err) {
			fn_callback(err)
		}
	}

	$ui.mask('login...')
	ajax_dologin(ajax_args,  (err, result) => {
		$ui.unmask();
		if (err) {
			if (err.status==401) {
				$.messager.alert('Login', err.errormessage, 'warning');
			} else {
				$ui.ShowErrorWindow();
			}
		} else {
			try {
				Cookies.set('tokenid', result.tokenid);

				location.reload();
			} catch (err) {
				console.log(err);
			}
		}
	});
}





