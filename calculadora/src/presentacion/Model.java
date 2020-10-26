package presentacion;

import logica.Calculator;

public class Model {

    private View inicialView; //Obtener la vista principal
    private Calculator system; //Obtener la parte logica

    public double r = 0; //Guarda los resultados que se obtienen desde la lógica
    public int operation = 0, singleOperation = 0; //Guarda los numeros de los resultados para operaciones simples o dobles
    private String simb[] = { "+", "-", "x", "/" }; //Simbolos 
    private boolean point = false; //Para saber si se estan manejando números double o int

    public void start() { //Inicia la venta, se llama desde el launcher
        getInicialView().setSize(565, 300);
        getInicialView().setVisible(true);
    }

    public void assignValue(String n) { //Añade al field principal el numero ingresado por el usuario
        String value = getInicialView().getField().getText();
        value = value + n;
        getInicialView().getField().setText(value);
    }

    public void assignOperator(int o) { //Asigna a operador de numeros dobles, el valor
        this.operation = o;
    }

    public void assignSingleOperator(int o) { //Asigna operados para operaciones simples
        this.singleOperation = o;
    }

    public void assignOperation(int o) { //Para las funciones basicas y dobles
        assignOperator(o); //Guarda la operación que se va a hacer
        setNumbers(); //Guarda en la logica los 2 numeros a operar
        Operation(); //Realiza la operación
    }

    public void setSingleOperation(int o) { //Para las funciones de un solo numero
        assignSingleOperator(o); //Guarda la operación a realizar
        getSystem().setN1(Double.parseDouble(getInicialView().getField().getText())); //Lee el número a operar
        singleOperation(); //Realiza la operación
    }

    public void setNumbers() { //Envia los dos numeros a operar a el sistema
        getSystem().setN1(Double.parseDouble(getInicialView().getField2().getText()));
        getSystem().setN2(Double.parseDouble(getInicialView().getField().getText()));
    }

    public void Operation() { //Para operaciones con dos numeros, segun la operación guardada, se realiza

        if (this.operation == 1) {
            this.r = getSystem().sum();
        }
        if (this.operation == 2) {
            this.r = getSystem().subtr();
        }
        if (this.operation == 3) {
            this.r = getSystem().mult();
        }
        if (this.operation == 4) {
            this.r = getSystem().divi();
        }
    }

    public void singleOperation() { //Para operacion con un número, segun el valor de single operation se realiza

        if (this.singleOperation == 5) {
            this.r = getSystem().expon();
        }
        if (this.singleOperation == 6) {
            this.r = getSystem().reverse();
        }
        if (this.singleOperation == 7) {
            this.r = getSystem().percent();
        }
        if (this.singleOperation == 8) {
            this.r = getSystem().sqrt();
        }

    }

    public void setValueSymbol(int s) { //Asigna el nuevo valor al field 2 y pone el signo de la operacion en pantalla
        String value = "";
        if (this.point == false) { //Si no se esta manejando numeros flotantes solo muestra la parte entera
            value = String.valueOf((int) this.r);
        }
        if (this.point == true) {
            value = String.valueOf(this.r);
        }
        getInicialView().getField().setText("");
        getInicialView().getField2().setText(value);
        getInicialView().getField3().setText(simb[s - 1]);
    }

    public void assignSingleOperation() { //Asigna el nuevo valor de la operacion simple relizada, al field 1
        String value = "";
        if (this.point == false) {
            value = String.valueOf((int) this.r);
        }
        if (this.point == true) {
            value = String.valueOf(this.r);
        }
        getInicialView().getField().setText(value);
    }

    public void setFloatOperation() { //Cuando oprimen el boton de punto, se estan manejando numeros flotantes
        this.point = true;
    }

    public void CEOperation() { //Borra el valor actual
        getInicialView().getField().setText("");
    }

    public void COperation() { //Borra todas las operaciones que se estaban realizando
        getInicialView().getField().setText("");
        getInicialView().getField2().setText("");
        getInicialView().getField3().setText("");
        this.r = 0;
        this.operation = 0;
        this.singleOperation = 0;
        this.point = false;
        getSystem().setN2(0);
        getSystem().setN1(0);
        
    }
    
    public View getInicialView() {
        if (inicialView == null)
            inicialView = new View(this);

        return inicialView;
    }

    public Calculator getSystem() {
        if (system == null)
            system = new Calculator();

        return system;
    }
}
