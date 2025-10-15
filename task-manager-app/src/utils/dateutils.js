// Общие вспомогательные функции
function getMinutesText(minutes) {
    const lastDigit = minutes % 10;
    const lastTwoDigits = minutes % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) return "минута";
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) return "минуты";
    return "минут";
}

function getHoursText(hours) {
    const lastDigit = hours % 10;
    const lastTwoDigits = hours % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) return "час";
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) return "часа";
    return "часов";
}

function getDaysText(days) {
    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) return "день";
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) return "дня";
    return "дней";
}

export function formatCreatedAt(createdAt) {
    if (!createdAt) return "Недавно";

    const createdDate = new Date(createdAt);
    const now = new Date();

    const correctedCreatedDate = new Date(createdDate.getTime() + 3 * 60 * 60 * 1000);

    const diffInMs = now - correctedCreatedDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
        return "Только что";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} ${getMinutesText(diffInMinutes)} назад`;
    } else if (diffInHours < 24) {
        return `${diffInHours} ${getHoursText(diffInHours)} назад`;
    } else if (diffInDays < 7) {
        return `${diffInDays} ${getDaysText(diffInDays)} назад`;
    } else {
        return createdDate.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }
}

export function formatDueDate(dueDate) {
    if (!dueDate) return "Без срока";

    const due = new Date(dueDate);
    const now = new Date();
    const diffInMs = due - now;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    // просрочено

    if (diffInMs < 0) {

        const overdueDays = Math.abs(diffInDays);
        const overdueHours = Math.abs(diffInHours);

        if (overdueHours < 24) {
            return `Просрочено на ${overdueHours} ${getHoursText(overdueHours)}`;
        } else {
            return `Просрочено на ${overdueDays} ${getDaysText(overdueDays)}`;
        }
    } else {
        // не просрочено
        if (diffInHours < 24) {
            if (diffInHours < 1) {
                const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
                if (diffInMinutes < 1) return "Меньше минуты";
                return `Осталось ${diffInMinutes} ${getMinutesText(diffInMinutes)}`;
            }
            return `Осталось ${diffInHours} ${getHoursText(diffInHours)}`;
        } else if (diffInDays < 7) {
            return `Осталось ${diffInDays} ${getDaysText(diffInDays)}`;
        } else {
            return due.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "short"
            });
        }
    }
}