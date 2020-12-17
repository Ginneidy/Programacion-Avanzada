from flask import Flask, jsonify, request
from flask_cors import CORS 
import sqlite3
import random
import string
from datetime import datetime

def createUser_table():
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    c.execute('''
    CREATE TABLE IF NOT EXISTS user(
	userID INTEGER PRIMARY KEY,
	username VARCHAR(20) NOT NULL,
	document VARCHAR(20) NOT NULL UNIQUE,
	telephone VARCHAR(10) NOT NULL,
	email VARCHAR(20) NOT NULL UNIQUE,
	department VARCHAR(20) NOT NULL,
	city VARCHAR(20) NOT NULL,
	address VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL,
    token VARCHAR(16) DEFAULT 0);
    ''')
    conn.commit()
    c.close()
    conn.close()

def createAdmin_table():
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    c.execute('''
    CREATE TABLE IF NOT EXISTS admin(
	userID INTEGER PRIMARY KEY,
	username VARCHAR(20) NOT NULL,
	email VARCHAR(20) NOT NULL UNIQUE,
	password VARCHAR(20) NOT NULL,
    token VARCHAR(16) DEFAULT 0);
    ''')
    conn.commit()
    c.close()
    conn.close()

def createWish_table():
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    c.execute('''
    CREATE TABLE IF NOT EXISTS wish(
	orderId INTEGER PRIMARY KEY,
	codUser INTEGER NOT NULL,
	codProduct INTEGER NOT NULL,
    description VARCHAR(20) NOT NULL,
	units INTEGER NOT NULL DEFAULT 1,
	date VARCHAR(30) NOT NULL,
    priceUnit INTEGER NOT NULL,
    total INTEGER NOT NULL,
    FOREIGN KEY("codUser") REFERENCES "user"("userID"),
	FOREIGN KEY("codProduct") REFERENCES "product"("productId"));
    ''')
    conn.commit()
    c.close()
    conn.close()
    
def createProduct_table():
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    c.execute('''
    CREATE TABLE IF NOT EXISTS product(
	productId  VARCHAR(11) NOT NULL PRIMARY KEY,
	description VARCHAR(20) NOT NULL,
	price INTEGER NOT NULL);
    ''')
    conn.commit()
    c.close()
    conn.close()

def data_entry(name,document,telephone,email,department,city,address,password): #Para registrar un usuario
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    c.execute("INSERT INTO user (userName, document, telephone, email,department,city,address,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      (name,document,telephone,email,department,city,address,password))
    conn.commit()
    c.close()
    conn.close()   
    

def token_entry(token,email,table):  #Para asignar el token a un usuario
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    c.execute("UPDATE "+table+" SET token=? WHERE email=?", (token,email))
    conn.commit()
    c.close()
    conn.close()
  
def verifyLogin(email,password,table):
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    find_user = ("SELECT * FROM "+table+" WHERE email = ? AND password = ?")
    c.execute(find_user,[(email),(password)])
    if c.fetchone() is not None:
        digits=""
        for i in range(16):
            letters = string.ascii_lowercase
            digits = ''.join(random.choice(letters) for i in range(16))
        token_entry(digits, email,table)
        conn.commit()
        c.close()
        conn.close()
        return digits
    else:
        conn.commit()
        c.close()
        conn.close()
        return False 

def make_order(token,product,units):
    fecha = datetime.now()
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    find_user = ("SELECT userID FROM user WHERE token = ?")
    c.execute(find_user,[(token)])
    user = c.fetchone()
    c.execute("SELECT units FROM wish WHERE codUser = ? AND codProduct = ? ",(user[0],product))
    exist = c.fetchone()
    if exist is not None: 
        newunits = int(exist[0])+int(units)
        c.execute("UPDATE wish SET units=? WHERE codUser = ? AND codProduct = ?",(newunits,user[0],product))
        find_price = ("SELECT price FROM product WHERE productId = ?")
        c.execute(find_price,[(product)])
        price = c.fetchone()
        c.execute("UPDATE wish SET total=? WHERE codUser = ? AND codProduct = ?",(newunits*int(price[0]),user[0],product))
        conn.commit()
        c.close()
        conn.close()
    else:
        find_description = ("SELECT description,price FROM product WHERE productId = ?")
        c.execute(find_description,[(product)])
        description = c.fetchone()
        c.execute("INSERT INTO wish(codUser,codProduct,description,units,date,priceUnit,total) VALUES(?,?,?,?,?,?,?)",(user[0],product,description[0],units,fecha,description[1],int(description[1])*int(units)))
        c.execute("UPDATE wish SET date=? WHERE codUser = ? AND codProduct = ?",(fecha,user[0],product))
        conn.commit()
        c.close()
        conn.close()
        
def update_user_order(cod,product,units):
    fecha = datetime.now()
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    c.execute("SELECT units FROM wish WHERE codUser = ? AND codProduct = ? ",(cod,product))
    exist = c.fetchone()
    if exist is not None: 
        newunits = int(exist[0])+int(units)
        c.execute("UPDATE wish SET units=? WHERE codUser = ? AND codProduct = ?",(newunits,cod,product))
        find_price = ("SELECT price FROM product WHERE productId = ?")
        c.execute(find_price,[(product)])
        price = c.fetchone()
        c.execute("UPDATE wish SET total=? WHERE codUser = ? AND codProduct = ?",(newunits*int(price[0]),cod,product))
        c.execute("UPDATE wish SET date=? WHERE codUser = ? AND codProduct = ?",(fecha,cod,product))
        conn.commit()
        c.close()
        conn.close()

    else:
        find_description = ("SELECT description,price FROM product WHERE productId = ?")
        c.execute(find_description,[(product)])
        description = c.fetchone()
        c.execute("INSERT INTO wish(codUser,codProduct,description,units,date,priceUnit,total) VALUES(?,?,?,?,?,?,?)",(cod,product,description[0],units,fecha,description[1],int(description[1])*int(units)))
        conn.commit()
        c.close()
        conn.close()

def consult_order(token):
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    find_user = ("SELECT userID FROM user WHERE token = ?")
    c.execute(find_user,[(token)])
    user = c.fetchone()
    if user is not None:
        find_products = ("SELECT codProduct,units,description,total FROM wish WHERE codUser = ?")
        c.execute(find_products,[(user[0])])
        data = c.fetchall()
        conn.commit()
        c.close()
        conn.close()
        return data
    else:
        conn.commit()
        c.close()
        conn.close()
        return False

def admin_consult_order(cod):
     conn = sqlite3.connect('tienda.db')
     c = conn.cursor()
     find_products = ("SELECT codProduct,units,description,total FROM wish WHERE codUser = ?")
     c.execute(find_products,[(cod)])
     data = c.fetchall()
     conn.commit()
     c.close()
     conn.close()
     return data
 
def delete_order(token,product):
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    find_user = ("SELECT userID FROM user WHERE token = ?")
    c.execute(find_user,[(token)])
    user = c.fetchone()
    if user is not None:
        c.execute("DELETE  FROM wish WHERE codProduct = ? AND codUser = ?", (product,user[0]))
        conn.commit()
        c.close()
        conn.close()
        return True
    else:
        c.close()
        conn.close()
        return False
    
def delete_user_order(cod):
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    c.execute("DELETE  FROM wish WHERE codUser = ?", (cod))
    conn.commit()
    c.close()
    conn.close()
    
    
def logout_user(token,table):
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    if token == 0:
        c.close()
        conn.close()
        return False
    else:
        find_user = ("SELECT userID FROM "+table+" WHERE token = ?")
        c.execute(find_user,[(token)])
        user = c.fetchone()
        c.execute("UPDATE "+table+" SET token=? WHERE userID=?", ("0",user[0]))
        conn.commit()
        c.close()
        conn.close()
        return True
    
def validate_token(token,table):
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    query = 'SELECT userID FROM '+table+' WHERE token=\"'+token+"\""
    c.execute(query)
    user = c.fetchone()
    if user is not None:
        conn.commit()
        c.close()
        conn.close()
        return True
    else:
        conn.commit()
        c.close()
        conn.close()
        return False
    
    
    
def search_user_order(cod):
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    find_user = ("SELECT username,document FROM user WHERE userID = ?")
    c.execute(find_user,[(cod)])
    data = c.fetchall()
    if data is not None:
        find_order = ("SELECT units FROM wish WHERE codUser = ?")
        c.execute(find_order,[(cod)])
        order = c.fetchall()
        conn.commit()
        c.close()
        conn.close()
        return order,data
    else:
        conn.commit()
        c.close()
        conn.close()
        return False

def search_product(product):
    conn = sqlite3.connect('tienda.db')
    c = conn.cursor()
    find_product = ("SELECT price FROM product WHERE productId = ?")
    c.execute(find_product,[(product)])
    data = c.fetchone()
    if data is not None:
        return True
    else:
        return False
    

    
app = Flask(__name__) 
CORS(app) 
       
@app.route('/layout2', methods =['POST']) 
def layout2():
    createUser_table()
    data_entry(request.json['userName'],request.json['userDocument'],request.json['userTelephone'],request.json['userEmail'],request.json['userDepartment'],request.json['userCity'],request.json['userAddress'],request.json['userPassword'])
    return jsonify({"Result":request.json['userName']}) 

@app.route('/login', methods =['POST']) 
def login():
    createUser_table()
    log = verifyLogin(request.json['userEmail'],request.json['userPassword'],"user")
    if log == False:  
        return jsonify({"token":0})
    else:
        return jsonify({"token": log})

@app.route('/loginAdmin', methods =['POST']) 
def loginAdmin():
    createAdmin_table()
    log = verifyLogin(request.json['userEmail'],request.json['userPassword'],"admin")
    if log == False:  
        return jsonify({"token":0})
    else:
        return jsonify({"token": log})

@app.route('/makeOrder', methods =['POST']) 
def makeOrder():
    createWish_table()
    make_order(request.json['userToken'], request.json['userProduct'], request.json['productUnits'])
    return jsonify({"Result": "user"}) 

@app.route('/consult', methods =['POST']) 
def consult():
    createWish_table()
    data = consult_order(request.json['userToken'])
    if data == False:
        return jsonify({"products": 0}) 
    else:
        return jsonify({"products": data}) 
    
@app.route('/consult_delete', methods =['POST']) 
def consult_element():
    delete = delete_order(request.json['userToken'], request.json['userProduct'])
    if delete == False:
        return jsonify({"result": "no borrado"}) 
    else:
        return jsonify({"result": delete}) 

@app.route('/logout', methods =['POST']) 
def logout():
    logoutUser = logout_user(request.json['userToken'],"user")
    if logoutUser == False:
        return jsonify({"result": 0}) 
    else:
        return jsonify({"result": 1}) 
    
@app.route('/logout_admins', methods =['POST']) 
def logout_admins():
    logoutUser = logout_user(request.json['userToken'],"admin")
    if logoutUser == False:
        return jsonify({"result": 0}) 
    else:
        return jsonify({"result": 1}) 
    
@app.route('/tokenValidate', methods =['POST']) 
def tokenValidate():
    token = validate_token(request.json['userToken'],"user")
    if token == False:
        return jsonify({"result": 0}) 
    else:
        return jsonify({"result": 1}) 
    
@app.route('/token_admin', methods =['POST']) 
def token_admin():
    token = validate_token(request.json['userToken'], "admin")
    if token == False:
        return jsonify({"result": 0}) 
    else:
        return jsonify({"result": 1}) 
    
@app.route('/search_order', methods =['POST']) 
def search_order():
    order,data = search_user_order(request.json['userCod'])
    return jsonify({"result": order,
                    "data":data })  

@app.route('/deleteU_order', methods =['POST']) 
def deleteU_order():
    delete_user_order(request.json['userCod'])
    return jsonify({"result": request.json['userCod'] })  
    
@app.route('/add_product', methods =['POST']) 
def add_product():
    if search_product( request.json['userProduct']) is False:
         return jsonify({"result": 0 })  
    else:
        update_user_order(request.json['userCod'], request.json['userProduct'], request.json['productUnits'])
        return jsonify({"result": request.json['userCod'] }) 
    
@app.route('/admin_consult', methods =['POST']) 
def admin_consult():
    data = admin_consult_order(request.json['userCod'])
    return jsonify({"products": data}) 
     

if __name__ == '__main__': 
	app.run(debug = True) 
 