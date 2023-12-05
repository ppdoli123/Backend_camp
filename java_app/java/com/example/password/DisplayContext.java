package com.example.password;




import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.text.util.Linkify;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DisplayContext extends AppCompatActivity {

    private ContextDatabase mydb;
    TextView name;
    TextView id;
    TextView password;
    TextView tv1;
    TextView tv2;

    int num = 0;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listadd);
        name = findViewById(R.id.editName);
        id= findViewById(R.id.editId);
        password = findViewById(R.id.editPassword);
        tv1 = findViewById(R.id.tv1);
        mydb = new ContextDatabase(this);
        //db에 저장되어있던 text 들을 edittext에 불러옵니다.
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            int Value = extras.getInt("num");
            if (Value > 0) {
                Cursor rs = mydb.getData(Value);
                num = Value;
                rs.moveToFirst();
                int intname = rs.getColumnIndex(ContextDatabase.Context_NAME);
                int intid = rs.getColumnIndex(ContextDatabase.Context_ID);
                int intpassword = rs.getColumnIndex(ContextDatabase.Context_PASSWORD);

                String strname = rs.getString(intname);
                String strid = rs.getString(intid);
                String strpassword = rs.getString(intpassword);
                if (!rs.isClosed()) {
                    rs.close();
                }
                //리스트뷰를 클릭해서 들어갈시에 추가하기 버튼은 invisible 처리, 링크주소를 단 단어를 설명하기위한 텍스트뷰는 visible 처리를 한다.
                Button btnsave =findViewById(R.id.btnSave);
                btnsave.setVisibility(View.INVISIBLE);
                tv2=findViewById(R.id.tv2);
                tv2.setVisibility(View.VISIBLE);
                tv1.setText(strname);
                name.setText(strname);
                id.setText(strid);
                password.setText(strpassword);

            }
        }
        //특정 단어에 링크달기
        Linkify.TransformFilter mTransform = new Linkify.TransformFilter() {
            @Override
            public String transformUrl(Matcher match, String url) {
                return ""; }
        };

        Pattern pattern1 = Pattern.compile("네이버");
        Pattern pattern2 = Pattern.compile("다음");
        Pattern pattern3 = Pattern.compile("카카오");
        Pattern pattern4 = Pattern.compile("KLAS");
        Pattern pattern5 = Pattern.compile("리그오브레전드");
        Pattern pattern6 = Pattern.compile("티맥스");
        Linkify.addLinks(tv1, pattern1, "https://www.naver.com/",null,mTransform);
        Linkify.addLinks(tv1, pattern2, "https://www.daum.net/",null,mTransform);
        Linkify.addLinks(tv1, pattern3, "https://www.kakaocorp.com/page/",null,mTransform);
        Linkify.addLinks(tv1, pattern4, "https://klas.kw.ac.kr/",null,mTransform);
        Linkify.addLinks(tv1, pattern5, "https://www.leagueoflegends.com/ko-kr/",null,mTransform);
        Linkify.addLinks(tv1, pattern6, "https://kr.tmaxsoft.com/main.do",null,mTransform);



    }
    //저장 버튼을 눌렀을때 edittext에 써놓은 text들을 새로 dv에 저장하고 메인엑티비티로 돌아옵니다.
    public void save(View view) {
        Bundle extras = getIntent().getExtras();
        tv1.setVisibility(View.INVISIBLE);
        if (extras != null) {
            int Value = extras.getInt("num");
            if (Value > 0) {
                if (mydb.updateContext(num, name.getText().toString(), id.getText().toString(), password.getText().toString())) {
                    Toast.makeText(getApplicationContext(), "수정되었습니다", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                    startActivity(intent);
                } else {
                    Toast.makeText(getApplicationContext(), "실패!", Toast.LENGTH_SHORT).show();
                }
            } else {
                if (mydb.insertContext(name.getText().toString(), id.getText().toString(), password.getText().toString())) {
                    Toast.makeText(getApplicationContext(), "추가되었습니다", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(getApplicationContext(), "실패!", Toast.LENGTH_SHORT).show();
                }
                finish();
            }
        }
    }
    //삭제 버튼을 눌렀을때 db자체를 삭제시킵니다.
    public void delete(View view) {
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            int Value = extras.getInt("num");
            if (Value > 0) {
                mydb.deleteContext(num);
                Toast.makeText(getApplicationContext(), "삭제되었습니다", Toast.LENGTH_SHORT).show();
                finish();
            } else {
                Toast.makeText(getApplicationContext(), "실패!", Toast.LENGTH_SHORT).show();
            }
        }
    }
    //업데이트 버튼을 누를시 저장버튼과 똑같은 알고리즘을 움직입니다.
    public void update(View view) {
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            int value = extras.getInt("num");
            if (value > 0) {
                if (mydb.updateContext(num, name.getText().toString(), id.getText().toString(), password.getText().toString())) {
                    Toast.makeText(getApplicationContext(), "수정되었습니다", Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    Toast.makeText(getApplicationContext(), "실패!", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }
}
