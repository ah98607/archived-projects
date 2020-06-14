// create a thread by implementing Runnable
class RunnableWithoutThread implements Runnable {

    String threadName;
    RunnableWithoutThread(String name) {
        threadName = name;
    }

    // override run
    public void run() {
        System.out.println("Thread" + threadName + " starting");

        // counting
        try {
            for (int i = 0; i < 10; i++) {
                Thread.sleep(400);
                System.out.println("In " + threadName +", count value is " + i);
            }
        }
        catch (InterruptedException e) {
            System.out.println(threadName + " interrupted");
        }

        // finish
        System.out.println(threadName + " completed");
    }
}
public class RunByPassingRunnableToThread {
    public static void main(String[] args) {
        System.out.println("main function started");

        // create runnable
        RunnableWithoutThread runnableA = new RunnableWithoutThread("child A");

        // create thread using runnable
        Thread thread = new Thread(runnableA);

        // start the thread
        thread.start();

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
