import Button from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Progress from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CONST_URL } from '@/constants/url';
import { cn } from '@/lib/utils';
import type { Logs, LogType } from '@/types/logger';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ProcessingProps = {
  percentage: number;
  message: string;
  logs: Logs;
};

const dateFormat = (time: number) => {
  const date = new Date(time);
  const formatter = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return `[${formatter.format(date.getHours())}:${formatter.format(date.getMinutes())}:${formatter.format(date.getSeconds())}]`;
};

const Processing = ({ percentage, message, logs }: ProcessingProps) => {
  const navigate = useNavigate();
  const [spread, setSpread] = useState(false);
  const [logString, setLogString] = useState<[LogType, string][]>([]);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    if (logString.length === logs.length || isLogging) {
      return;
    }
    setIsLogging(true);
    const logDiff = logs.slice(
      Math.max(0, logString.length - 1),
      Math.max(1, logs.length - 1),
    );
    setLogString((prev) => [
      ...prev,
      ...logDiff.map<[LogType, string]>((log) => [
        log.logType,
        `${dateFormat(log.time)} ${log.message}`,
      ]),
    ]);
    setIsLogging(false);
  }, [logs, isLogging]);

  return (
    <div className="flex h-150 items-center justify-center">
      <Card className="w-150">
        <CardHeader>
          <CardTitle>이미지 가공 중입니다..</CardTitle>
          <CardDescription className="font-sans text-[14px]">
            {logString.length > 0
              ? logString[logString.length - 1][1]
              : '이미지 가공 준비중입니다..'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-start gap-1.5 font-sans">
          <p className="text-[24px]">{message}</p>
          <Progress value={percentage} max={100} />
          <div className="mt-5 flex items-center justify-center gap-1.5">
            <Button
              content="취소하기"
              status="danger"
              size="md"
              variant="default"
              onClick={() => navigate(CONST_URL.HOME)}
            />
            <Button
              content={spread ? '로그 닫기' : '로그 펼치기'}
              status="primary"
              size="md"
              variant="ghost"
              onClick={() => setSpread(!spread)}
            />
          </div>
          <ScrollArea
            className={cn(
              'w-full overflow-y-auto rounded-md border text-[14px] transition-all ease-out',
              spread ? 'border-strong bg-weak h-80' : 'h-0 border-none',
            )}
          >
            {logString &&
              logString.map(([logType, message], idx) => (
                <p
                  key={idx}
                  className={cn(
                    logType === 'error' ? 'text-danger' : 'text-primary',
                  )}
                >
                  {message}
                </p>
              ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Processing;
