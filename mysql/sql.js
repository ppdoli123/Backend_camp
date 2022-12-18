module.exports = {
  customerList: `select * from users`,
  userList: `select id from users`,
  useridCheck: 'select if( exists(select id from users where id=?), 1, 0)',
  usernameCheck: 'select if( exists(select id from users where name=?), 1, 0)',
  userpwCheck: 'select pw from users where id=?',
  usersaltCheck: 'select salt from users where id=?',
  userInsert: `insert into users set ?`,
  userUpdate: `UPDATE users SET pw=?, name=?, birthday=?, interest=?, salt=?, oneline=? where id=?`,

  saveBookmark: 'insert into bookmark set ?',
  viewBookmark: 'select * from bookmark where id=?',
  viewfollower: 'select * from follower where fk_userid=?',
  userInfo: 'select * from users where id=?',
  placeInfo: 'select * from placecsv where p_key=?',
  recipeInfo: 'select * from recipe_ where r_key=?',
  place: 'select * from placecsv',
  place_point: 'select * from placecsv order by recommand DESC',
  recipe_point: 'select * from recipe_ order by recommand DESC',
  p_point_country: 'select * from placecsv where country=? order by recommand DESC',
  p_point_foodT: 'select * from recipe_ order where foodType=? by recommand DESC',
  p_point_all: 'select * from placecsv where country=? and foodType=? order by recommand DESC',
  r_point_foodT: 'select * from recipe_ where food1=? order by recommand DESC',

  p_country: 'select * from placecsv where country=?',
  p_foodT: 'select * from placecsv where foodType=?',
  p_all: 'select * from placecsv where country=? and foodType=?',
  placename: 'select * from placecsv where placeName=?',
  placekey: 'select * from placecsv where p_key=?',
  recipekey: 'select * from recipe_ where r_key=?',
  recipe: 'select * from recipe_',
  r_foodT: 'select * from recipe_ where food1=?',
  p_comment: 'select * from p_comment',
  r_comment: 'select * from r_comment',
  viewPcomment: 'select * from p_comment where p_key=?',
  viewRcomment: 'select * from r_comment where r_key=?',

  viewPcommentbyID: 'select * from p_comment where writer=?',
  viewRcommentbyID: 'select * from r_comment where writer=?',
  upgrade: `UPDATE users SET grade=? where id=?`,
  viewGrade: 'select grade from users where id=?',
  viewfollower: 'select * from follow where follow=?',

  getName: 'select name from users where id=?',
  
  viewfollow: `select * from follow where id=?`, // id가 팔로우한 사람들

  viewPlacePost: `select placeName, title, image1, p_key from placecsv where id=?`, // id가 작성한 맛집 게시글
  viewRecipePost: `select RCP_NM, image, r_key, food1 from recipe_ where id=?`, // id가 작성한 레시피 게시글

  writePlace: `insert into placecsv set ?`, // 맛집 게시글 작성
  writeRecipe: `insert into recipe_ set ?`, // 레시피 게시글 작성

  writeCommentPlace: `insert into p_comment set ?`, // 맛집 게시글에 댓글 작성
  writeCommentRecipe: `insert into r_comment set ?`, // 레시피 게시글 댓글 작성

  follow: `insert IGNORE into follow set ?`, // 팔로우하기
  unfollow: `delete from follow where id=? and follow=?`, // 팔로우 취소
  checkFollow: `select * from follow where id=? and follow=?`, // 팔로우 여부 확인

  checkBookmark: `select * from bookmark where id=? and category=? and keyy=?`, // 북마크 여부 확인

  recommandPlace: `UPDATE placecsv SET recommand=? where p_key=?`, // 맛집 게시글 추천
  recommandRecipe: `UPDATE recipe_ SET recommand=? where r_key=?`, // 레시피 게시글 추천
};

