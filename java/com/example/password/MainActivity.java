package com.example.password;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;
import java.util.ArrayList;
import java.util.Calendar;



public class MainActivity extends AppCompatActivity {
    private ListView ListView1;
    ContextDatabase mydb;
    ArrayAdapter myAdapter;
    Intent intent;
    ArrayList array_List;
    String[] strArray;
    String start_infection;
    String same_infection;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);
        new Alarmtime(getApplicationContext()).Alarm();

        mydb=new ContextDatabase(this);
        array_List = mydb.getAllContext();
        myAdapter = new ArrayAdapter(this, R.layout.listview,array_List);


        ListView1 = findViewById(R.id.listView1);
        ListView1.setAdapter(myAdapter);
        //num값이 같은걸 찾아 그 열에 저장된 값을 다음엑티비티로 넘겨준다
        ListView1.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                String item = (String) (adapterView).getItemAtPosition(i);
                strArray = item.split("");
                int num=Integer.parseInt(strArray[0]);
                Bundle dataBundle = new Bundle();
                dataBundle.putInt("num",num);
                Intent intent = new Intent(getApplicationContext(), DisplayContext.class);
                intent.putExtras(dataBundle);
                startActivity(intent);

            }
        });
        registerForContextMenu(ListView1);

    }
    //방송수신자를 이용한 알림
    public class Alarmtime {
        private Context context;
        public Alarmtime(Context context) {
            this.context = context;
        }
        public void Alarm() {
            AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
            Intent intent = new Intent(MainActivity.this, Broadcast.class);
            PendingIntent sender = PendingIntent.getBroadcast(MainActivity.this, 0, intent, 0);
            Calendar calendar = Calendar.getInstance();
            //알람시간 calendar에 set해주기
            calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DATE),  calendar.get(Calendar.HOUR),  calendar.get(Calendar.MINUTE)+10, 0);

            //알람 예약
            am.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
        }
    }

    //컨텍스트메뉴 생성
    @Override
    public void onCreateContextMenu(ContextMenu menu, View v,
                                    ContextMenu.ContextMenuInfo menuInfo) {
        getMenuInflater().inflate(R.menu.menu_listview, menu);
        super.onCreateContextMenu(menu, v, menuInfo);
    }
    @Override
    //아이디가 같은 값을 찾아서 같으면 색상 변경 & 토스트메시지 출력
    public boolean onContextItemSelected(@NonNull MenuItem item) {
        AdapterView.AdapterContextMenuInfo info = (AdapterView.AdapterContextMenuInfo) item.getMenuInfo();
        int index = info.position;

        super.onContextItemSelected(item);
        if(item.getItemId()==R.id.hacking){

            start_infection = (String) ListView1.getItemAtPosition(index);
            for (int i=0 ; i < array_List.size();i++){
                same_infection = (String) ListView1.getItemAtPosition(i);
                if(((String) same_infection.substring(same_infection.lastIndexOf(" ") + 1)).equals((String) start_infection.substring(start_infection.lastIndexOf(" ") + 1))) {

                    Toast.makeText(this, same_infection.substring(same_infection.lastIndexOf(",") + 1, same_infection.lastIndexOf(":"))+"에 아이디를 바꿔주셔야합니다.", Toast.LENGTH_SHORT).show();
                    createNotification(same_infection);
                    ListView1.getChildAt(i).setBackgroundColor(Color.RED);


                }
            } }
        else if (item.getItemId()==R.id.solve){
            info.targetView.setBackgroundColor(0x00ff0000);
        }
        return true;

    }
    private void createNotification(String count) {

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "default");

        builder.setSmallIcon(R.drawable.warning);
        builder.setContentTitle("해킹발생");
        builder.setContentText("색상이 변한 아이디들을 바꿔주세요");
        builder.setColor(Color.RED);
        // 사용자가 탭을 클릭하면 자동 제거
        builder.setAutoCancel(true);
        NotificationManager notificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            notificationManager.createNotificationChannel(new NotificationChannel("default", "기본 채널", NotificationManager.IMPORTANCE_DEFAULT));
        }
        notificationManager.notify(1, builder.build());
    }

    @Override
    protected void onResume() {
        super.onResume();
        myAdapter.clear();
        myAdapter.addAll(mydb.getAllContext());
        myAdapter.notifyDataSetChanged();
    }

    public void search(View target) {
        Bundle bundle = new Bundle();
        bundle.putInt("num", 0);

        intent = new Intent(this,DisplayContext.class);
        intent.putExtras(bundle);
        startActivity(intent);

    }
}
