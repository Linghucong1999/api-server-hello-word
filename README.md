# nodejs大事件后台API项目
## 注册
首先我们必须简单的创建一个表，里面有用户名密码这些便可，后续有需要再加上; 

同时我们需要对用户密码加密，这里我使用的是**bcryptjs**组件对密码加密; 

> ![image](https://user-images.githubusercontent.com/94914428/221244690-b5829105-e7b3-433d-83e8-a1ace56fecf5.png)

**注册成功** 

> ![image](https://user-images.githubusercontent.com/94914428/221244838-f45ccb58-56b1-4a99-8723-a9cacd7efb23.png)

## 登录
下面我们对登录进行验证，那我们就需要对密码解密，我们一样使用到**bcryptjs**组件将用户输入的密码和数据库中用户的密码进行比对 `bcrypt.compareSync(userinfo.password, results[0].password)`

同时我们把信息挂载到token上，然后返回token字符串，我们再使用相应的token解析，把信息挂载到req上面，最新的**jsonwebtoken**中信息是在**req.auth**中而不是**req.user**中去，这点是我们使用token需要注意的。

![image](https://user-images.githubusercontent.com/94914428/221246698-88deca5e-38dc-49aa-bff7-abeed91b735c.png)



