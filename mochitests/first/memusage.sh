MOCHIPID=`pgrep -f 'name n1'`
while [ 1 ]
do
		    NUMCON=`netstat -n | awk '/ESTABLISHED/ && $4=="127.0.0.1:8080"' | wc -l`
			    MEM=`ps -o rss= -p $MOCHIPID`
				    echo -e "`date`\t`date +%s`\t$MEM\t$NUMCON"
					    sleep 60
				done | tee -a mochimem.log
