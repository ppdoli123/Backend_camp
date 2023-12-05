package com.example.password;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;

public class ContextDatabase extends SQLiteOpenHelper {
    public static final String DATABASE_NAME = "mycontact.db";
    public static final String Context_TABLE_NAME = "context";
    public static final String Context_NUM = "num";
    public static final String Context_NAME = "name";
    public static final String Context_ID = "id";
    public static final String Context_PASSWORD = "password";


    public ContextDatabase(Context context) {
        super(context, DATABASE_NAME, null, 1);

    }
    //db 생성
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE contexts " + " ( num integer PRIMARY KEY , name text, id text,password text);");

    }
    //새로 생성
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS contexts");
        onCreate(db);
    }
    //db에 삽입 하는 메소드
    public boolean insertContext(String name, String id, String password) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();

        contentValues.put("name", name);
        contentValues.put("id", id);
        contentValues.put("password", password);
        db.insert("contexts", null, contentValues);
        return true;
    }
    //커서이용해서 num 값이 같은 시리즈열을 찾는다
    public Cursor getData(int num) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor res = db.rawQuery("select * from contexts where num=" + num + "",null);
        return res;


    }

    public int numberOfRows() {
        SQLiteDatabase db = this.getReadableDatabase();
        int numRows = (int) DatabaseUtils
                .queryNumEntries(db, Context_TABLE_NAME);
        return numRows;
    }
    //num 값이용해서 그 열에 저장시킨다.
    public boolean updateContext(Integer num,String name, String id, String password){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("name",name);
        contentValues.put("id",id);
        contentValues.put("password",password);
        db.update("contexts",contentValues,"num = ?",
                new String[] {Integer.toString(num) });
        return true;
    }
    //num 값 이용해서 그열을 삭제시킨다.
    public void deleteContext(Integer num){
        SQLiteDatabase db=this.getWritableDatabase();
        db.delete("contexts","num=?",new String[]{Integer.toString(num)});

    }
    //try,catch 문사용하여 예외처리를 하였고, db에 저장된걸 array_list로 가져온다.
    public ArrayList getAllContext() {

        ArrayList array_list = new ArrayList();
        try {
            SQLiteDatabase db = this.getReadableDatabase();
            Cursor res = db.rawQuery("select * from contexts", null);
            res.moveToFirst();
            while (res.isAfterLast() == false) {
                int index1 = res.getColumnIndex(Context_NUM);
                int index2 = res.getColumnIndex(Context_NAME);
                int index3 = res.getColumnIndex(Context_ID);
                array_list.add(res.getString(index1) + "," +
                        res.getString(index2) + ": " + res.getString(index3));
                res.moveToNext();
            }
        }
        catch(SQLiteException e)
        {}

        return array_list;
    }
}