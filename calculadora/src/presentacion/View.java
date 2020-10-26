package presentacion;

import javax.swing.*;

import java.awt.Color;
import java.awt.Font;

public class View extends JFrame {
    JButton ceroButton = new JButton("0");
    JButton oneButton = new JButton("1");
    JButton twoButton = new JButton("2");
    JButton threeButton = new JButton("3");
    JButton fourButton = new JButton("4");
    JButton fiveButton = new JButton("5");
    JButton sixButton = new JButton("6");
    JButton sevenButton = new JButton("7");
    JButton eightButton = new JButton("8");
    JButton nineButton = new JButton("9");
    JButton pointButton = new JButton(".");
    JButton sumButton = new JButton("+");
    JButton subtrButton = new JButton("-");
    JButton multButton = new JButton("x");
    JButton diviButton = new JButton("/");
    JButton exponButton = new JButton("x²");
    JButton reverseButton = new JButton("1/x");
    JButton percentButton = new JButton("%");
    JButton sqrtButton = new JButton("√");
    JButton CEButton = new JButton("CE");
    JButton CButton = new JButton("C");
    JButton equalButton = new JButton("=");
    JTextField field = new JTextField();
    JTextField field2 = new JTextField();
    JTextField field3 = new JTextField();

    Font font = new Font("Adobe Caslon Pro", Font.BOLD, 20);
    Font font2 = new Font("Adobe Caslon Pro", Font.ITALIC, 15);

    Color color1 = new Color(219,219,219);
    Color color2 = new Color(140,140,140);
    
    private final Model model;
    private Controller control;

    public View(Model m) {
        model = m;
        initComponents();
        assignEvents();
    }

    private void initComponents() {

        setLayout(null);

        add(ceroButton);
        add(oneButton);
        add(twoButton);
        add(threeButton);
        add(fourButton);
        add(fiveButton);
        add(sixButton);
        add(sevenButton);
        add(eightButton);
        add(nineButton);
        add(pointButton);
        add(sumButton);
        add(subtrButton);
        add(multButton);
        add(diviButton);
        add(exponButton);
        add(reverseButton);
        add(percentButton);
        add(sqrtButton);
        add(CEButton);
        add(CButton);
        add(equalButton);
        add(field);
        add(field2);
        add(field3);

        field.setFont(font);
        field2.setFont(font2);
        field3.setFont(font2);
        field.setHorizontalAlignment(SwingConstants.RIGHT);
        field2.setHorizontalAlignment(SwingConstants.LEFT);
        field3.setHorizontalAlignment(SwingConstants.CENTER);
        field.setEditable(false);
        field2.setEditable(false);
        field3.setEditable(false);

        field2.setForeground(color2);
        field3.setForeground(color2);

        field.setBorder(javax.swing.BorderFactory.createEmptyBorder());
        field2.setBorder(javax.swing.BorderFactory.createEmptyBorder());
        field3.setBorder(javax.swing.BorderFactory.createEmptyBorder());

        field.setBackground(color1);
        field2.setBackground(color1);
        field3.setBackground(color1);

        field.setBounds(229, 10, 220, 80);
        field2.setBounds(10, 10, 175, 80);
        field3.setBounds(175, 10, 94, 80);
        CEButton.setBounds(469, 10, 86, 35);
        CButton.setBounds(469, 55, 86, 35);

        oneButton.setBounds(10, 100, 55, 35);
        twoButton.setBounds(75, 100, 55, 35);
        threeButton.setBounds(140, 100, 55, 35);
        fourButton.setBounds(10, 145, 55, 35);
        fiveButton.setBounds(75, 145, 55, 35);
        sixButton.setBounds(140, 145, 55, 35);
        sevenButton.setBounds(10, 190, 55, 35);
        eightButton.setBounds(75, 190, 55, 35);
        nineButton.setBounds(140, 190, 55, 35);
        ceroButton.setBounds(10, 235, 120, 35);
        pointButton.setBounds(140, 235, 55, 35);

        diviButton.setBounds(210, 100, 113, 35);
        multButton.setBounds(210, 145, 113, 35);
        sumButton.setBounds(210, 190, 113, 35);
        subtrButton.setBounds(210, 235, 113, 35);

        exponButton.setBounds(333, 100, 113, 35);
        reverseButton.setBounds(333, 145, 113, 35);
        percentButton.setBounds(333, 190, 113, 35);
        sqrtButton.setBounds(333, 235, 113, 35);

        equalButton.setBounds(466, 100, 86, 170);

    }

    public Model getModel() {
        return model;
    }

    public Controller getControl(){
        if (control == null){
            control = new Controller(this); 
        }
        return control;
    }

    /* Obtener Botones  */
      /*
      - Números
      -*/  

    public JButton getOneButton(){
        return oneButton;
    }
    public JButton getTwoButton(){
        return twoButton;
    }
    public JButton getThreeButton(){
        return threeButton;
    }
    public JButton getFourButton(){
        return fourButton;
    }
    public JButton getFiveButton(){
        return fiveButton;
    }
    public JButton getSixButton(){
        return sixButton;
    }
    public JButton getSevenButton(){
        return sevenButton;
    }
    public JButton getEightButton(){
        return eightButton;
    }
    public JButton getNineButton(){
        return nineButton;
    }
    public JButton getCeroButton(){
        return ceroButton;
    }

    /*
      - Opergaciones y signos
      -*/ 

    public JButton getPointButton(){
        return pointButton;
    }
    public JButton getDiviButton(){
        return diviButton;
    }
    public JButton getMultButton(){
        return multButton;
    }
    public JButton getSumButton(){
        return sumButton;
    }
    public JButton getSubtrButton(){
        return subtrButton;
    }
    public JButton getExponButton(){
        return exponButton;
    }
    public JButton getReverseButton(){
        return reverseButton;
    }
    public JButton getPercentButton(){
        return percentButton;
    }
    public JButton getSqrtButton(){
        return sqrtButton;
    }

    /*
    - Borrar e igual
    -*/

    public JButton getCEButton(){
        return CEButton;
    }
    public JButton getCButton(){
        return CButton;
    }
    public JButton getEqualButton(){
        return equalButton;
    }

    /*
    - JtextField
    -*/

    public JTextField getField(){
        return field;
    }
    public JTextField getField2(){
        return field2;
    }
    public JTextField getField3(){
        return field3;
    }
    /* Asignar Eventos a todos los botones */

    private void assignEvents(){

        oneButton.addActionListener(getControl());
        twoButton.addActionListener(getControl());
        threeButton.addActionListener(getControl());
        fourButton.addActionListener(getControl());
        fiveButton.addActionListener(getControl());
        sixButton.addActionListener(getControl());
        sevenButton.addActionListener(getControl());
        eightButton.addActionListener(getControl());
        nineButton.addActionListener(getControl());
        ceroButton.addActionListener(getControl());

        pointButton.addActionListener(getControl());
        diviButton.addActionListener(getControl());
        multButton.addActionListener(getControl());
        sumButton.addActionListener(getControl());
        subtrButton.addActionListener(getControl());
        exponButton.addActionListener(getControl());
        reverseButton.addActionListener(getControl());
        percentButton.addActionListener(getControl());
        sqrtButton.addActionListener(getControl());

        CEButton.addActionListener(getControl());
        CButton.addActionListener(getControl());
        equalButton.addActionListener(getControl());
        
    }
}
