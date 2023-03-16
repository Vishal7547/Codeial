module.exports.profile=function(req,res){
    return res.render('user',{
title:'users',
    });
    }

module.exports.signUp=(req,res)=>{
    return res.render('user_sign_up',{
        title:'Codeial | signUp',
            });
     }
    

 module.exports.signIn=(req,res)=>{
        return res.render('user_sign_in',{
            title:'Codeial | signIn',
                });
         }     