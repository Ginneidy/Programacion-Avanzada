package presentacion;

import java.awt.event.*;

public class Controller implements ActionListener {
    private final View view;
    private Model model;

    public Controller(View athis) {
        view = athis;
        model = view.getModel();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        /*
        - Inicio leer los numeros: unicamente se agregan al field
        -*/
        if (e.getSource() == view.getCeroButton()) {
            model.assignValue("0");
        }
        if (e.getSource() == view.getOneButton()) {
            model.assignValue("1");
        }
        if (e.getSource() == view.getTwoButton()) {
            model.assignValue("2");
        }
        if (e.getSource() == view.getThreeButton()) {
            model.assignValue("3");
        }
        if (e.getSource() == view.getFourButton()) {
            model.assignValue("4");
        }
        if (e.getSource() == view.getFiveButton()) {
            model.assignValue("5");
        }
        if (e.getSource() == view.getSixButton()) {
            model.assignValue("6");
        }
        if (e.getSource() == view.getSevenButton()) {
            model.assignValue("7");
        }
        if (e.getSource() == view.getEightButton()) {
            model.assignValue("8");
        }
        if (e.getSource() == view.getNineButton()) {
            model.assignValue("9");
        }

        /*
        -Fin de leer numeros
        -*/

        if (e.getSource() == view.getPointButton()) {
            model.assignValue(".");
            model.setFloatOperation(); //Como se agrego un punto, se activa en el modelo que se esta trabajando con flotantes
        }

        /*
        - Inicio botones de operaciones 
        -*/
        
        if (e.getSource() == view.getSumButton()) {
            if (view.getField().getText().length() != 0 && view.getField2().getText().length() != 0
                    && model.operation != 1) { // Cuando hay una operacion por realizar antes que esta
                model.setNumbers();
                model.Operation();
                model.setValueSymbol(1);
                model.assignOperator(1);
            } else if (view.getField().getText().length() == 0 && view.getField2().getText().length() == 0) { 
                //Cuando oprime el boton sin que hallan valores anteriores
                view.getField2().setText("0");
                view.getField3().setText("+");
                model.assignOperator(1);
            } else if (view.getField2().getText().length() != 0 && view.getField().getText().length() == 0) { 
                // cuando ya hay un valor al que realizarle la operacion (Para que se pueda cambiar la operacion)
                view.getField3().setText("+");
                model.assignOperator(1);
            } else if (view.getField2().getText().length() == 0) { //Pro primera vez
                view.getField2().setText(view.getField().getText());
                view.getField().setText("");
                view.getField3().setText("+");
                model.assignOperator(1);
            } else { //Cuando quiere sumar los numeros
                model.assignOperation(1);
                model.setValueSymbol(1);
            }

        }
        if (e.getSource() == view.getSubtrButton()) {
            if (view.getField().getText().length() != 0 && view.getField2().getText().length() != 0 && model.operation != 2) {
                model.setNumbers();
                model.Operation();
                model.setValueSymbol(2);
                model.assignOperator(2);
            } else if (view.getField().getText().length() == 0 && view.getField2().getText().length() == 0) {
                view.getField2().setText("0");
                view.getField3().setText("-");
                model.assignOperator(2);
            } else if (view.getField2().getText().length() != 0 && view.getField().getText().length() == 0) {
                view.getField3().setText("-");
                model.assignOperator(2);
            } else if (view.getField2().getText().length() == 0) {
                view.getField2().setText(view.getField().getText());
                view.getField().setText("");
                view.getField3().setText("-");
                model.assignOperator(2);
            } else {
                model.assignOperation(2);
                model.setValueSymbol(2);
            }
        }
        if (e.getSource() == view.getMultButton()) {
            if (view.getField().getText().length() != 0 && view.getField2().getText().length() != 0
                    && model.operation != 3) {
                model.setNumbers();
                model.Operation();
                model.setValueSymbol(3);
                model.assignOperator(3);
            } else if (view.getField().getText().length() == 0 && view.getField2().getText().length() == 0) {
                view.getField2().setText("0");
                view.getField3().setText("x");
                model.assignOperator(3);
            } else if (view.getField2().getText().length() != 0 && view.getField().getText().length() == 0) {
                view.getField3().setText("x");
                model.assignOperator(3);
            } else if (view.getField2().getText().length() == 0) {
                view.getField2().setText(view.getField().getText());
                view.getField().setText("");
                view.getField3().setText("x");
                model.assignOperator(3);
            } else {
                model.assignOperation(3);
                model.setValueSymbol(3);
            }
          
        }
        if (e.getSource() == view.getDiviButton()) {
            if (view.getField().getText().length() != 0 && view.getField2().getText().length() != 0
                    && model.operation != 4) {
                model.setNumbers();
                model.Operation();
                model.setValueSymbol(4);
                model.assignOperator(4);
            } else if (view.getField().getText().length() == 0 && view.getField2().getText().length() == 0) {
                view.getField2().setText("0");
                view.getField3().setText("/");
                model.assignOperator(4);
            } else if (view.getField2().getText().length() != 0 && view.getField().getText().length() == 0) {
                view.getField3().setText("/");
                model.assignOperator(4);
            } else if (view.getField2().getText().length() == 0) {
                view.getField2().setText(view.getField().getText());
                view.getField().setText("");
                view.getField3().setText("/");
                model.assignOperator(4);
            } else {
                model.assignOperation(4);
                model.setValueSymbol(4);
            }
        }
        if (e.getSource() == view.getExponButton()) {
            if(view.getField().getText().length() == 0 && view.getField2().getText().length() == 0){
                view.getField().setText("0");
            } else if(view.getField2().getText().length() != 0 && view.getField().getText().length() == 0){
                view.getField().setText("0");
            } 
            else {
                model.setSingleOperation(5);
                model.assignSingleOperation();
            }
        
        }
        if (e.getSource() == view.getReverseButton()) {
            
            if(view.getField().getText().length() == 0 && view.getField2().getText().length() == 0){
                view.getField().setText("0");
            } else if(view.getField2().getText().length() != 0 && view.getField().getText().length() == 0){
                view.getField().setText("0");
            } 
            else {
                model.setFloatOperation();
                model.setSingleOperation(6);
                model.assignSingleOperation();
            }


        }
        if (e.getSource() == view.getPercentButton()) {
            if(view.getField().getText().length() == 0 && view.getField2().getText().length() == 0){
                view.getField().setText("0");
            } else if(view.getField2().getText().length() != 0 && view.getField().getText().length() == 0){
                view.getField().setText("0");
            } else if(view.getField2().getText().length() != 0 && view.getField().getText().length() != 0){
                model.setFloatOperation();
                model.setNumbers();
                model.assignSingleOperator(7);
                model.singleOperation();
                model.assignSingleOperation();
            }
            else {
                model.setFloatOperation();
                model.setSingleOperation(7);
                model.assignSingleOperation();
            }
        }
        if (e.getSource() == view.getSqrtButton()) {
            if(view.getField().getText().length() == 0 && view.getField2().getText().length() == 0){
                view.getField().setText("0");
            } else if(view.getField2().getText().length() != 0 && view.getField().getText().length() == 0){
                view.getField().setText("0");
            } 
            else {
                model.setFloatOperation();
                model.setSingleOperation(8);
                model.assignSingleOperation();
            }
        }
        if (e.getSource() == view.getCEButton()) {
            model.CEOperation();
        }
        if (e.getSource() == view.getCButton()) {
            model.COperation();
        }
        if (e.getSource() == view.getEqualButton()) {
            if (view.getField().getText().length() != 0 && view.getField2().getText().length() != 0) { // Cuando hay una operacion por realizar antes que esta
                model.setNumbers();
                model.Operation();
                model.assignSingleOperation();
                view.getField2().setText("");
                view.getField3().setText("");
            }else if(view.getField().getText().length() == 0 && view.getField2().getText().length() == 0){
                view.getField().setText("0");
            } else if(view.getField2().getText().length() != 0 && view.getField().getText().length() == 0){
                view.getField().setText(view.getField2().getText());
                view.getField2().setText("");
                view.getField3().setText("");
            } 
        }

    }

}
