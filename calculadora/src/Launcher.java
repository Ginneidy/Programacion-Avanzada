import presentacion.Model;

public class Launcher {

    private Model app;

    public Launcher(){
        app = new Model();
        app.start();
    }

    public static void main(String[] args) {
        new Launcher();
    }
}
