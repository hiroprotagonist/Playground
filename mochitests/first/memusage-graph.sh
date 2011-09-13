(
echo "set terminal png size 500,300"
echo "set xlabel \"Minutes Elapsed\""
echo "set ylabel \"Mem (KB)\""
echo "set title \"Mem usage with 10k active connections, 1000 msg/sec\""
echo "plot \"-\" using 1:2 with lines notitle"
awk 'BEGIN{FS="\t";} 
     NR%10==0 {if(!t){t=$2} mins=($2-t)/60; 
	      printf("%d %d\n",mins,$3)}' mochimem.log
		  echo "end" 
		  ) | gnuplot > mochimem.png
