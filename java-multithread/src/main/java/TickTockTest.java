class TickTokHelper {
    String state; // state of the state machine
    synchronized void tick(boolean isRunning) {

        // this if block makes sure that tick() can return
        if (!isRunning) {
            state = "ticked";
            notify(); // notify waiting threads
            return;
        }

        System.out.println("Tick ");
        state = "ticked";
        notify();
        try {
            while (!state.equals("tocked")) {
                wait();
            }
        }
        catch (InterruptedException e) {
            System.out.println("Thread interrupted");
        }
    }
    synchronized void tock(boolean isRunning) {

        // this if block makes sure that tock() can return
        if (!isRunning) {
            state = "tocked";
            notify(); // notify waiting threads
            return;
        }

        System.out.println("Tock ");
        state = "tocked";
        notify();
        try {
            while (!state.equals("ticked")) {
                wait();
            }
        }
        catch (InterruptedException e) {
            System.out.println("Thread interrupted");
        }
    }
}
class TickTockThread implements Runnable {
    Thread thread;
    TickTokHelper tt;
    TickTockThread(String name, TickTokHelper tt) {
        thread = new Thread(this, name);
        this.tt = tt;
        thread.start();
    }
    public void run() {
        System.out.println(thread.getName() + " started");
        if (thread.getName().equals("Tick")) {
            for (int i = 0; i < 5; i++) {
                tt.tick(true);
            }
            tt.tick(false);
        }
        else {
            for (int i = 0; i < 5; i++) {
                tt.tock(true);
            }
            tt.tock(false);
        }
    }
}
public class TickTockTest {
    public static void main(String[] args) {

        // create a unique ticktock object
        TickTokHelper tt = new TickTokHelper();

        // create threads
        // note two share the same TickTock object
        TickTockThread t1 = new TickTockThread("Tick", tt);
        TickTockThread t2 = new TickTockThread("Tock", tt);

        try {
            t1.thread.join();
            t2.thread.join();
        }
        catch (InterruptedException e) {
            System.out.println("main thread interrupted");
        }
    }
}