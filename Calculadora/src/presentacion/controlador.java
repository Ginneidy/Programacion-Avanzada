package presentacion;

import java.awt.event.*;

public class controlador implements ActionListener{

    private final vista view;
    private modelo model;

    public controlador(vista athis){
        view = athis;
        model = view.getModel();
    }
    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == view.getCeroButton()){
            
        }
        if (e.getSource() == view.getOneButton()){

        }
        if (e.getSource() == view.getTwoButton()){
            
        }
        if (e.getSource() == view.getThreeButton()){
            
        }
        if (e.getSource() == view.getFourButton()){
            
        }
        if (e.getSource() == view.getFiveButton()){
            
        }
        if (e.getSource() == view.getSixButton()){
            
        }
        if (e.getSource() == view.getSevenButton()){
            
        }
        if (e.getSource() == view.getEightButton()){
            
        }
        if (e.getSource() == view.getNineButton()){
            
        }
        if (e.getSource() == view.getPointButton()){

        }
        if (e.getSource() == view.getSumButton()){

        }
        if (e.getSource() == view.getSubtrButton()){

        }
        if (e.getSource() == view.getMultButton()){

        }
        if (e.getSource() == view.getDiviButton()){

        }
        if (e.getSource() == view.getSumButton()){

        }
        if (e.getSource() == view.getCEButton()){

        }
        if (e.getSource() == view.getCButton()){

        }
        if (e.getSource() == view.getExponButton()){

        }
        if (e.getSource() == view.getReverseButton()){

        }
        if (e.getSource() == view.getPercentButton()){

        }
        if (e.getSource() == view.getSqrtButton()){

        }
        if (e.getSource() == view.getEqualButton()){

        }

    }
    
}
