package com.example.password;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;

import java.util.concurrent.Executor;

public class LoginActivity extends AppCompatActivity {
    private Executor executor;
    private BiometricPrompt biometricPrompt;
    private BiometricPrompt.PromptInfo promptInfo;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        Button button=findViewById(R.id.login);
        Button button2=findViewById(R.id.newid);
        Button button3=findViewById(R.id.buttonFingerprint);
        //지문인식 메소드 실행
        executor = ContextCompat.getMainExecutor(this);
        biometricPrompt = new BiometricPrompt(this, executor, new BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
                super.onAuthenticationError(errorCode, errString);
                Toast.makeText(getApplicationContext(), "인증에러!", Toast.LENGTH_SHORT).show();
            }
            //지문인식 성공할시 메인엑티비티로 화면 전환
            @Override
            public void onAuthenticationSucceeded(
                    @NonNull BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                Toast.makeText(getApplicationContext(), "인증성공!", Toast.LENGTH_SHORT).show();
                Intent intent=new Intent(getApplicationContext(),MainActivity.class);
                startActivity(intent);
            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                Toast.makeText(getApplicationContext(), "인증실패!", Toast.LENGTH_SHORT).show();
            }
        });

        promptInfo = new BiometricPrompt.PromptInfo.Builder()
                .setTitle("지문 인증")
                .setNegativeButtonText("취소")
                .setDeviceCredentialAllowed(false)
                .build();


        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(getApplicationContext(),SignupActivity.class);
                startActivity(intent);

            }
        });
    } //id가 button 인 Sign in 버튼의 onClick에 login을 써줌.
    public void fingerprint(View v){
        biometricPrompt.authenticate(promptInfo);
            }
    // 로그인 함수
    public void login(View v){
        EditText editText=findViewById(R.id.editid);
        EditText editText2=findViewById(R.id.editpassword);
        //회원가입창에서 받은 데이터를 여기에 넘겨줌
        Intent receiveIntent=getIntent();
        String id=receiveIntent.getStringExtra("userid");
        String pw=receiveIntent.getStringExtra("userpw");
        String name=receiveIntent.getStringExtra("username");
        String userid=editText.getText().toString();
        String userpw=editText2.getText().toString();
        //아이디 비밀번호 일치일때는 메인 화면에 진입. 불일치시 토스트 메시지.
        if(userid.equals(id))
        { if(userpw.equals(pw)){
            Intent intent=new Intent(getApplicationContext(),MainActivity.class);
            Toast.makeText(this,name+"님 안녕하세요.",Toast.LENGTH_SHORT).show();
            startActivity(intent);

        }
            else{ Toast.makeText(getApplicationContext(),"아이디 혹은 비밀번호가 일치하지 않습니다",Toast.LENGTH_SHORT).show();
        } }
        else{ Toast.makeText(getApplicationContext(),"아이디 혹은 비밀번호가 일치하지 않습니다",Toast.LENGTH_SHORT).show();
        }
    }
}



