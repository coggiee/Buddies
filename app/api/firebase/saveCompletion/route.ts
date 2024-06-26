import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/config/firebase';
import dayjs from 'dayjs';

export async function POST(req: NextRequest) {
  const { completion, email, prompt } = await req.json();
  if (email === undefined || email.length === 0 || email === null) {
    return NextResponse.json({
      message: 'Firestore Chat Saving Failed! User is Anonymous!',
    });
  }
  const currentDate =
    process.env.NODE_ENV === 'development' ? dayjs() : dayjs().add(9, 'hour');
  const todayDate = currentDate.format('YY-MM-DD');
  const curTime = currentDate.format('HH');

  const dateRef = doc(db, `Users/${email}/ChatHistory`, todayDate);
  const dateSnap = await getDoc(dateRef);

  if (!dateSnap.exists()) {
    await setDoc(doc(db, `Users/${email}/ChatHistory`, todayDate), {
      available: true,
    });
  }

  const chatRef = doc(
    db,
    `Users/${email}/ChatHistory/${todayDate}/${prompt}`,
    curTime
  ); // ChatHistory 컬렉션 가져오고, 날짜로 문서 이름 설정
  const chatSnap = await getDoc(chatRef);

  if (chatSnap.exists()) {
    // 있으면 기존 문서에 대화 기록 추가
    await updateDoc(
      doc(db, `Users/${email}/ChatHistory/${todayDate}/${prompt}`, curTime),
      {
        gpt: arrayUnion({
          content: completion,
          role: 'assistant',
          timestamp: currentDate.format('YYYY-MM-DD HH:mm:ss'),
        }),
      }
    );
    return NextResponse.json({
      message: 'Firestore Completion Saving SUCCESS!',
    });
  } else {
    await setDoc(
      doc(db, `Users/${email}/ChatHistory/${todayDate}/${prompt}`, curTime),
      {
        gpt: [
          {
            content: completion,
            role: 'assistant',
            timestamp: currentDate.format('YYYY-MM-DD HH:mm:ss'),
          },
        ],
      }
    );
    return NextResponse.json({
      message: 'Firestore Completion Saving SUCCESS!',
    });
  }
}
