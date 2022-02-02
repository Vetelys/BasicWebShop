

/**
 * TODO: 8.4 Register new user
 *       - Handle registration form submission
 *       - Prevent registration when password and passwordConfirmation do not match
 *       - Use createNotification() function from utils.js to show user messages of
 *       - error conditions and successful registration
 *       - Reset the form back to empty after successful registration
 *       - Use postOrPutJSON() function from utils.js to send your data back to server
 */
document.getElementById("btnRegister").addEventListener("click", function(event){
    event.preventDefault();
    const nameinput = document.getElementById('name');
    const emailinput = document.getElementById('email');
    const passinput = document.getElementById('password');
    const passconfinput = document.getElementById('passwordConfirmation');

    if(!nameinput.value){
        createNotification('No name', 'notifications-container', false);
    }
    else if(!emailinput.value){
        createNotification('No email', 'notifications-container', false);
    }
    else if(!passinput.value){
        createNotification('No password', 'notifications-container', false)
    }
    else if(!passconfinput.value){
        createNotification('No password confirmation', 'notifications-container', false)
    }
    else if(passinput.value != passconfinput.value){
        createNotification('Passwords dont match', 'notifications-container', false);
    }else{
        const name = nameinput.value;
        const email = emailinput.value;
        const pass = passinput.value;
        data = {'name':name, 'email':email, 'password':pass, 'role': 'customer'};
        postOrPutJSON(`/api/register`, 'POST', data).then(json =>{
            document.getElementById('register-form').reset();
            createNotification('Account created!', 'notifications-container', true);
        })
        .catch((error) =>{
            createNotification(`Error creating account! ${error}`, 'notifications-container', false);
        });
    }
    

});