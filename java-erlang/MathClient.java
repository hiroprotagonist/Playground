import com.ericsson.otp.erlang.*;
public class MathClient {
	public static void main (String[] _args) throws Exception{
		long a = Long.parseLong(_args[0]);
		long b = Long.parseLong(_args[1]);
		OtpSelf cNode = new OtpSelf("clientnode", "YCMUAIODHAZLGUKUTKUE");
		OtpPeer sNode = new OtpPeer("n1@pig");
		OtpConnection connection = cNode.connect(sNode);
		OtpErlangObject[] args = new OtpErlangObject[]{ new OtpErlangLong(a), new OtpErlangLong(b)};
		connection.sendRPC("mathserver", "add", args);
		OtpErlangLong sum = (OtpErlangLong) connection.receiveRPC();
		System.out.println("Erlang mathserver said:" + sum.intValue());
	}
}
