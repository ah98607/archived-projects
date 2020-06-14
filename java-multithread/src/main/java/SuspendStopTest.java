class MyThreadWithStopSuspend implements Runnable {
    Thread thread;
    boolean stopped;
    boolean suspended;

    MyThreadWithStopSuspend(String name) {
        thread = new Thread(this, name);
        stopped = false;
        suspended = false;
        thread.start();
    }

    public void run() {
        System.out.println(thread.getName() + " starting");

        try {
            for (int i = 0; i < 1000; i++) {
                System.out.print(i + " ");
                if (i % 10 == 0) {
                    System.out.println("");
                    thread.sleep(250);
                }

                // check suspended and stopped
                synchronized (this) {
                    while (suspended) {
                        wait();
                    }
                    if (stopped) {
                        // exit the for loop
                        break;
                    }
                }
            }
        }
        catch (InterruptedException e) {
            System.out.println(thread.getName() + " interrupted");
        }

        System.out.println(thread.getName() + " completed");
    }

    synchronized void myStop() {
        stopped = true;

        // make it possible to stop a suspended thread
        suspended = false;

        notify();
    }

    synchronized void mySuspend() {
        suspended = true;
    }

    synchronized void myResume() {
        suspended = false;
        notify();
    }
}

public class SuspendStopTest {
    public static void main(String[] args) {
        MyThreadWithStopSuspend myThreadWithStopSuspend = new MyThreadWithStopSuspend("t1");

        try {
            Thread.sleep(1000);

            myThreadWithStopSuspend.mySuspend();
            System.out.println("Suspending thread");
            Thread.sleep(1000);

            myThreadWithStopSuspend.myResume();
            System.out.println("Resuming thread");
            Thread.sleep(1000);

            myThreadWithStopSuspend.mySuspend();
            System.out.println("Suspending thread");
            Thread.sleep(1000);

            myThreadWithStopSuspend.myResume();
            System.out.println("Resuming thread");
            Thread.sleep(1000);

            myThreadWithStopSuspend.myStop();
            System.out.println("Stopping thread");
            Thread.sleep(1000);
        }
        catch (InterruptedException e) {
            System.out.println("main thread interrupted");
        }

        try {
            myThreadWithStopSuspend.thread.join();
        }
        catch (InterruptedException e) {
            System.out.println("main thread interrupted");
        }

        System.out.println("mian thread completed");
    }
}
