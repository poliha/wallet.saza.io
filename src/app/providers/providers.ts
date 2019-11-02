import { CustomValidators } from './custom-validator';
import { Utility } from './utility';
import { UserService } from './user.service';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { TransactionService as TxService } from './transaction.service';
import { NotificationService } from './notification.service';

export {
  CustomValidators,
  Utility,
  UserService,
  AuthGuard,
  TxService,
  NotificationService
};

export const INVALID_PASSWORD_ERROR = `Invalid password.`;
export const ENCRYPTION_FAILED_ERROR = `Encryption failed.`;

