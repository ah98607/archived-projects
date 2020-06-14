// create a thread by implementing Runnable
class RunnableWithThread implements Runnable {

    //String threadName;
    Thread threadInRunnable;
    RunnableWithThread(String name) {
        // create embedded thread object
        threadInRunnable = new Thread(this, name);
        // immediately run the thread
        threadInRunnable.start();
    }

    // override run
    public void run() {
        System.out.println(threadInRunnable.getName() + " starting");

        // counting
        try {
            for (int i = 0; i < 10; i++) {
                Thread.sleep(400);
                System.out.println("In " + threadInRunnable.getName() +", count value is " + i);
            }
        }
        catch (InterruptedException e) {
            System.out.println(threadInRunnable.getName() + " interrupted");
        }

        // finish
        System.out.println(threadInRunnable.getName() + " completed");
    }
}

public class RunByNotPassingRunnableToThread {
    public static void main(String[] args) {
        System.out.println("main function started");

        // create runnable
        RunnableWithThread runnableA = new RunnableWithThread("child A");

        // create thread using runnable
        //Thread thread = new Thread(runnableA);

        // start the thread
        //thread.start();

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
