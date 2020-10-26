package logica;

public class Calculator {
    double n1, n2;
    public void setN1(double n1){
        this.n1 = n1;
    }
    public void setN2(double n2){
        this.n2 = n2;
    }
    public double sum(){
        double r = n1+n2;
        return r;
    }
    public double subtr(){
        double r = n1-n2;
        return r;
    }
    public double mult(){
        double r = n1*n2;
        return r;
    }
    public double divi(){
        double r = n1/n2;
        return r;
    }
    public double expon(){
        double r = n1*n1;
        return r;
    }
    public double percent(){
        double r = 0;
        if(n2 == 0){
             r = n1/100;
        }else{
             r = (n1*n2)/100;
        }
        return r;
    }
    public double reverse(){
        double r =  1/n1;
        return r;
    }
    public double sqrt(){ 
        double r =  Math.sqrt(n1);
        return r;
    }
    
}
