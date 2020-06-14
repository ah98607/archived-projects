class MyThreadWihtoutExplicitRunnable extends Thread {
    MyThreadWihtoutExplicitRunnable(String name) {
        super(name);
        start();
    }
    // override run of thread (not runnable
    public void run() {
        System.out.println(getName() + " starting");

        // counting
        try {
            for (int i = 0; i < 10; i++) {
                Thread.sleep(400);
                System.out.println("In " + getName() +", count value is " + i);
            }
        }
        catch (InterruptedException e) {
            System.out.println(getName() + " interrupted");
        }

        // finish
        System.out.println(getName() + " completed");
    }
}
public class RunWithExtendedThread {
    public static void main(String[] args) {
        System.out.println("main function started");

        // create runnable
        //RunnableWithThread runnableA = new RunnableWithThread("child A");

        // create thread using runnable
        //Thread thread = new Thread(runnableA);

        // start the thread
        //thread.start();

        MyThreadWihtoutExplicitRunnable threadWithouExplicitRunnable = new MyThreadWihtoutExplicitRunnable("child A");

        for (int i = 0; i < 50; i++) {
            System.out.println("main thread count is " + i);
            try {
                Thread.sleep(100);
            }
            catch(InterruptedException e) {
                System.out.println("main thread interrupted");
            }
        }

        System.out.println("main thread completed");
    }
}
